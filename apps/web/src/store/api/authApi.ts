import { apiRequest, ApiRequestOptions } from '@/lib/apiClient';
import { API_CONFIG } from './apis';
import { HTTPMethods } from '@/utils/enums';

export const refreshTokenApi = () => {
    const apiRequestConfig: ApiRequestOptions = {
        method: HTTPMethods.POST,
        url: API_CONFIG.refresh,
    };
    const response = apiRequest(apiRequestConfig);
    return response;
};

export const loginApi = ({ email, password }: { email: string; password: string }) => {
    const apiRequestConfig: ApiRequestOptions = {
        method: HTTPMethods.POST,
        url: API_CONFIG.login,
        data: {
            email,
            password
        },
    };
    const response = apiRequest(apiRequestConfig);
    return response;
};

export const getUserProfileApi = () => {
    const apiRequestConfig: ApiRequestOptions = {
        method: HTTPMethods.GET,
        url: API_CONFIG.profile,
    };
    const response = apiRequest(apiRequestConfig);
    return response;
};