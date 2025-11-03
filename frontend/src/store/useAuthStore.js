import { create } from 'zustand';
import axiosInstance from '../lib/axios.js';


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
    }

}))