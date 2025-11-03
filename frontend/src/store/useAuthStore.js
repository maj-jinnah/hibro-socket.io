import { create } from 'zustand';
import axiosInstance from '../lib/axios.js';
import { toast } from 'react-hot-toast';


export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningIn: false,
    isLoggingIn: false,
    isUpdatingProfile: false,

    isCheckingAuth: true,

    checkAuth: async () => {
        try {
            const response = await axiosInstance.get('/auth/check');
            const userData = response.data;
            set({ authUser: userData, isCheckingAuth: false });
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
        try {
            const response = await axiosInstance.post('/auth/login', formData);
            const userData = response.data;
            set({ authUser: userData, isLoggingIn: false });
            toast.success("Login successful");
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
        } catch (error) {
            console.error("Logout error -", error);
            toast.error(error.response?.data?.message || "Logout failed");
        }
    },

}))