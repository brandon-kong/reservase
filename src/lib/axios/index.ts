import axios from 'axios';

export const api = axios.create({
    baseURL: process.env.BACKEND_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const clientApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_API_URL,
});
