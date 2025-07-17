import axios from 'axios';

const API = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // e.g., http://192.168.50.51:90
    withCredentials: true,
    withXSRFToken: true
});

// Fetch CSRF token before each request
// API.interceptors.request.use(async (config) => {
//     if (!document.cookie.includes('XSRF-TOKEN')) {
//         await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/sanctum/csrf-cookie`, {
//             withCredentials: true,
//             withXSRFToken: true
//         });
//     }
//     return config;
// });

export default API;