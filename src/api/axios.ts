import axios, { AxiosError } from "axios";
import type { InternalAxiosRequestConfig, AxiosInstance } from "axios";

console.log("🔍 VITE_API_URL:", import.meta.env.VITE_API_URL);
console.log("🔍 Todas las env:", import.meta.env);
const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});
console.log('🔍 baseURL configurada:', api.defaults.baseURL);

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error);
  }
);

export default api;
