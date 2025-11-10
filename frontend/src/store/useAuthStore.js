import { toast } from 'react-hot-toast';
import { io } from "socket.io-client";
import { create } from 'zustand';
import axiosInstance from '../lib/axios.js';

const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;

export const useAuthStore = create((set, get) => ({
    authUser: null,
    isSigningIn: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    onlineUsers: [],
    isCheckingAuth: true,
    socket: null,

    checkAuth: async () => {
        try {
            const response = await axiosInstance.get('/auth/check');
            const userData = response.data;
            set({ authUser: userData, isCheckingAuth: false });
            get().connectSocket();
        } catch (error) {
            console.error("Check auth error -", error);
            set({ authUser: null, isCheckingAuth: false });
        }
    },

    signup: async (formData) => {
        set({ isSigningUp: true });
        try {
            const response = await axiosInstance.post('/auth/register', formData);
            const userData = response.data;
            set({ authUser: userData, isSigningUp: false });
        } catch (error) {
            console.error("Signup error -", error);
            toast.error(error.response?.data?.message || "Signup failed");
            set({ isSigningUp: false });
        }
    },

    login: async (formData) => {
        set({ isLoggingIn: true });
        try {
            const response = await axiosInstance.post('/auth/login', formData);
            const userData = response.data;
            set({ authUser: userData, isLoggingIn: false });
            toast.success("Login successful");
            get().connectSocket();
        } catch (error) {
            console.error("Login error -", error);
            toast.error(error.response?.data?.message || "Login failed");
            set({ isLoggingIn: false });
        }
    },

    logout: async () => {
        try {
            await axiosInstance.post('/auth/logout');
            set({ authUser: null });
            toast.success("Logout successful");
            get().disConnectSocket();
        } catch (error) {
            console.error("Logout error -", error);
            toast.error(error.response?.data?.message || "Logout failed");
        }
    },

    updateProfile: async (formData) => {
        set({ isUpdatingProfile: true });
        try {
            const response = await axiosInstance.patch('/auth/update-profile', formData);
            const updatedUserData = response.data;
            // set((state) => ({ authUser: { ...state.authUser, ...updatedUserData }, isUpdatingProfile: false }));
            set({ authUser: updatedUserData });
            toast.success("Profile updated successfully");
        } catch (error) {
            console.error("Update profile error -", error);
            toast.error(error.response?.data?.message || "Profile update failed");
            set({ isUpdatingProfile: false });
        }
    },

    connectSocket: () => {
        const { authUser, socket } = get();
        if (!authUser || socket?.connected) return;

        const socketIo = io(backendUrl, {
            query: { userId: authUser?._id }
        });
        
        socketIo.connect();
        set({ socket: socketIo });

        socketIo.on("getOnlineUsers", (onlineUserIds) => {
            set({ onlineUsers: onlineUserIds });
        });
    },

    disConnectSocket: () => {
        const socket = get().socket;
        if (socket) {
            socket.disconnect();
        }
    }
}))