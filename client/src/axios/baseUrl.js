import axios from "axios";

export const baseUrl = axios.create({
    baseURL: "http://localhost:8080/api/v1",
})

export const axiosConfig = (token) => {baseUrl.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
});}
