import axios from "axios";

const instance = axios.create({
    baseURL: process.env.NEXTAUTH_BACKEND_URL,
    withCredentials: true,
});

export default instance;