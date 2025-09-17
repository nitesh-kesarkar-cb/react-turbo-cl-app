import axios, {
  AxiosError,
  AxiosHeaders,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
// import { getRefreshToken } from "../services/auth";
// import { useAuthStore } from "../store/store";
import { endpoints } from "@/api/endpoints";

interface IErrorResponse {
  message?: string;
}

// Create an Axios instance
const axiosInstance = (): AxiosInstance => {
  return axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
  });
};

const httpClient = axiosInstance();

// Request interceptor
httpClient.interceptors.request.use(
  async function (
    config: InternalAxiosRequestConfig
  ): Promise<InternalAxiosRequestConfig> {
    // Add token to header
    const userString = localStorage.getItem("user");
    const userState = userString ? JSON.parse(userString) : null;
    const token = userState?.state?.user?.accessToken || "";

    // Initialize headers as AxiosHeaders and set the Authorization token
    const headers = new AxiosHeaders(config.headers);
    headers.set("Authorization", token ? `Bearer ${token}` : undefined);

    // Update config.headers with the modified headers
    config.headers = headers;

    return config;
  },
  function (error: AxiosError) {
    // Handle error before request is sent
    return Promise.reject(error);
  }
);

// Response interceptor
httpClient.interceptors.response.use(
  function (response: AxiosResponse) {
    // Any status code that lies within the range of 2xx causes this function to trigger
    return response;
  },
  async function (error: AxiosError) {
    // Any status codes that fall outside the range of 2xx cause this function to trigger
    const { response, config } = error;

    if (
      config?.url === endpoints.AUTH.CREATE_PASSWORD ||
      config?.url === endpoints.AUTH.LOGIN ||
      config?.url === endpoints.AUTH.FORGET_PASSWORD ||
      config?.url === endpoints.AUTH.RESET_PASSWORD
    ) {
      return Promise.reject(error);
    }

    if (response && response.config.url === endpoints.AUTH.REFRESH_TOKEN) {
      // Remove user from local storage
      localStorage.removeItem("user");

      // Redirect to the login page
      window.location.href = "/login";
    }

    //401
    if (response && response.status === 401) {
      const userSting = localStorage.getItem("user");

      if (userSting?.length) {
        const user = JSON.parse(userSting).state.user;

        const payload = {
          userId: user?.userId,
          refreshToken: user?.refreshToken,
        };

        try {
          // const newTokenResponse = await getRefreshToken(payload);
          //set access token
          // useAuthStore
          //   .getState()
          //   .setAccessToken(newTokenResponse?.data?.accessToken);
          //set refresh token
          // useAuthStore
          //   .getState()
          //   .setRefreshToken(newTokenResponse?.data?.refreshToken);
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (e: unknown) {
          // Remove user from local storage
          localStorage.removeItem("user");

          // Redirect to the login page
          window.location.href = "/login";
        }
      }
    }

    //403
    if (response && response.status === 403) {
      const errorMessage =
        (response?.data as IErrorResponse)?.message || "Access forbidden";
      localStorage.setItem("errorMessage", errorMessage);

      // Remove user from local storage
      localStorage.removeItem("user");

      // Redirect to the login page
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default httpClient;
