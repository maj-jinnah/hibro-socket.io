import axios from 'axios';

const axiosInstance = axios.create({
    //   baseURL: process.env.BASE_URL,
    baseURL: 'http://localhost:5000/api/v1',
    timeout: 1000,
    headers: { 'X-Custom-Header': 'foobar' },
    withCredentials: true,
});

export default axiosInstance;