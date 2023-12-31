// api.js
import axios from 'axios';

const API = axios.create({
    baseURL: 'http://skazzi.ru/api/',
    headers: {
        'Content-Type': 'application/json',
    },
});

API.interceptors.request.use(config => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export default API;