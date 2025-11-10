import axios from 'axios';

const backendUrl = import.meta.env.VITE_BASE_URL;

const axiosInstance = axios.create({
    baseURL: backendUrl,
    timeout: 1000,
    headers: { 'X-Custom-Header': 'foobar' },
    withCredentials: true,
});

export default axiosInstance;