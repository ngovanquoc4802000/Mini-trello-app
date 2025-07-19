import axios from "axios";

const API_URL_BASE = import.meta.env.VITE_API_URL;


export const Request = axios.create({
    baseURL: API_URL_BASE,
     headers: {
    "Content-Type": "application/json",
  },
});

Request.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});