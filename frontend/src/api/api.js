import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' }); // Replace with your backend URL

// Add token to headers if available
API.interceptors.request.use((req) => {
    const userId = sessionStorage.getItem('userId');
    if (userId) {
        req.headers.Authorization = `Bearer ${userId}`;
    }
    console.log("linked with backend");
    return req;
});

export default API;
