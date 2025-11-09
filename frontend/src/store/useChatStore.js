import toast from 'react-hot-toast';
import { create } from 'zustand';
import axiosInstance from '../lib/axios.js';
import { useAuthStore } from './useAuthStore.js';

export const useChatStore = create((set, get) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,

    getUsers: async () => {
        set({ isUsersLoading: true });
        try {
            const res = await axiosInstance.get("/messages/users");
            set({ users: res.data.users });
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isUsersLoading: false });
        }
    },

    getMessages: async (userId) => {
        set({ isMessagesLoading: true });
        try {
            const res = await axiosInstance.get(`/messages/conversations/${userId}`);
            set({ messages: res.data });
        } catch (error) {
            console.log('getMessage from useChatStore:-', error)
            toast.error(error.message);
        } finally {
            set({ isMessagesLoading: false });
        }
    },

    sendMessage: async (messageData) => {
        const { selectedUser, messages } = get();
        try {
            const res = await axiosInstance.post(`/messages/conversations/${selectedUser._id}`, messageData);
            set({ messages: [...messages, res.data] });
        } catch (error) {
            console.log('getMessage from useChatStore:-', error)
            toast.error(error.message);
        }
    },

    subscribeToNewMessages: () => {
        const { selectedUser } = get();
        if (!selectedUser) return;

        const { socket } = useAuthStore.getState();
        if (!socket) return;
        socket.on('newMessage', (message) => {
            if (message.senderId === selectedUser._id) {
                set({ messages: [...get().messages, message] });
            }
        });
    },

    unsubscribeFromNewMessages: () => {
        const { socket } = useAuthStore.getState();
        if (!socket) return;
        socket.off('newMessage');
    },

    setSelectedUser: (selectedUser) => set({ selectedUser }),


}));
