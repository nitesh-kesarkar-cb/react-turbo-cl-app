import axios, { AxiosInstance } from "axios";
import { useAuthStore } from "@/store/slice";
import { HTTPMethods } from "@/utils/enums";
import i18n from "@/i18n";
import { API_BASE_URL, API_BASE_URL_MIN_VERSION } from '@/constants/envDefaults'

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    minVersion: API_BASE_URL_MIN_VERSION,
  }
});

axiosInstance.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
// refresh token logic
let isRefreshing = false;
let failedQueue: Array<{resolve: (value: any) => void, reject: (reason?: any) => void}> = [];

// const processQueue = (error: any, token: string | null = null) => {
//   failedQueue.forEach((prom) => {
//     if (error) {
//       prom.reject(error);
//     } else {
//       prom.resolve(token);
//     }
//   });
//   failedQueue = [];
// };


axiosInstance.interceptors.response.use(
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
            return axiosInstance(originalRequest);
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

export interface ApiRequestOptions {
  method: HTTPMethods;
  url: string;
  data?: Record<string, string>;
  params?: Record<string, string | number | boolean>;
}

type Primitive = string | number | boolean;
type QueryParams = Record<string, Primitive | Primitive[] | null | undefined>;

function attachParamsToUrl(url: string, params?: QueryParams): string {
  // default params
  const lang = i18n.language || 'en';

  const allParams: QueryParams = {
    lang,
    ...params,
  };

  // test absolute URL
  const isAbsoluteUrl = /^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(url);
  const newUrl = new URL(url, 'http://test.com');

  Object.entries(allParams).forEach(([key, value]) => {
    if (value === undefined || value === null) return

    if (Array.isArray(value)) {
      value.forEach((v) => newUrl.searchParams.append(`${key}[]`, String(v)));
    } else {
      newUrl.searchParams.append(key, String(value));
    }
  });

  return isAbsoluteUrl ? newUrl.toString() : newUrl.toString().replace(newUrl.origin, '');
}

export async function apiRequest<T>(options: ApiRequestOptions): Promise<T> {
  const { method, url, data, params } = options;

  const urlWithParams = attachParamsToUrl(url, params);

  const requestConfig: any = {
    method,
    url: urlWithParams,
  };
  if (data && method !== HTTPMethods.GET) {
    requestConfig.data = data;
  }

  try {
    const response = await axiosInstance.request<T>(requestConfig);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message =
        error.response?.data?.message ||
        error.message ||
        'Network error occurred';
      throw new Error(message);
    }
    throw new Error('Network error occurred');
  }
}

