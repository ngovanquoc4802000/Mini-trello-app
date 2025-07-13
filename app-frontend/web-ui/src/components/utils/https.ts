import axios from "axios";

const API_URL_BASE = import.meta.env.VITE_API_URL;

export const Request = axios.create({
    baseURL: API_URL_BASE
});