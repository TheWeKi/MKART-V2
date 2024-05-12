import axios from "axios";

export const baseUrl = axios.create({
    baseURL: "https://mkart-v2-server.onrender.com/api/v1",
})
