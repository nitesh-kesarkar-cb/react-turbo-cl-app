// src/lib/apiClient.ts
import axios from "axios";
import { useAuthStore } from "@/store/slice";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000/api",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
// refresh token logic
let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};


api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const { response, config } = err;
    const originalRequest = config;

    if (response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = "Bearer " + token;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;
    // refresh token flow here
    //   try {
    //     const { data } = await axios.post(
    //       "/auth/refresh",
    //       {},
    //       { baseURL: api.defaults.baseURL, withCredentials: true }
    //     );
    //     useAuthStore.getState().setTokens(data.accessToken, data.refreshToken);
    //     processQueue(null, data.accessToken);
    //     originalRequest.headers.Authorization = "Bearer " + data.accessToken;
    //     return api(originalRequest);
    //   } catch (refreshErr) {
    //     processQueue(refreshErr, null);
    //     useAuthStore.getState().logout();
    //     return Promise.reject(refreshErr);
    //   } finally {
    //     isRefreshing = false;
    //   }
    }

    return Promise.reject(err);
  }
);

export default api;
