import axios from "axios";
import { useAuthStore } from "../store/useAuthStore";

// Point this at your Node/Express backend.
// Use 10.0.2.2 for Android emulator -> localhost on your machine.
const BASE_URL = "http://10.0.2.2:4000/api";

export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

apiClient.interceptors.request.use((config) => {
  const { phoneNumber } = useAuthStore.getState();
  if (phoneNumber) {
    config.headers = config.headers ?? {};
    (config.headers as any)["X-User-Phone"] = phoneNumber;
  }
  return config;
});

apiClient.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error("API error:", err?.response?.data ?? err.message);
    return Promise.reject(err);
  }
);
