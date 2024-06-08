import HttpStatus from '@/common/constants/http.constant';
import localStorageAuthService from '@/common/storages/authStorage';
import type { IBodyResponse } from '@/common/type';
import { IAuthTokens } from '@/modules/auth/types';
import dayjs from '@/plugins/dayjs';
import type { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import axios from 'axios';
import { throttle } from 'lodash';
import { logout } from './helper';

const options: AxiosRequestConfig = {
  headers: {
    'Content-Type': 'application/json',
    'X-Timezone': dayjs().format('Z'),
    'X-Timezone-Name': dayjs.tz.guess()
  },
  baseURL: import.meta.env.VUE_APP_API_URL,
  responseType: 'json',
  withCredentials: true
};

const axiosInstance = axios.create(options);
let refreshingPromise: Promise<AxiosResponse> | null = null;

async function sendRefreshToken() {
  const API_URL = import.meta.env.VUE_APP_API_URL;
  refreshingPromise = axios.post<IBodyResponse<IAuthTokens>>(`${API_URL}/auth/refresh`, {
    refreshToken: localStorageAuthService.getRefreshToken()
  });
  refreshingPromise
    .then(async (res) => {
      if (res?.status === HttpStatus.OK) {
        localStorageAuthService.setAccessToken(res?.data?.data.accessToken);
        localStorageAuthService.setRefreshToken(res?.data?.data.refreshToken);
      } else {
        await logout(true);
      }
    })
    .catch(async () => {
      logout(true);
    })
    .finally(() => {
      refreshingPromise = null;
    });
}

const throttled = throttle(sendRefreshToken, 10000, { trailing: false });

axiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig & { _retried?: boolean }) => {
    await refreshingPromise;

    Object.assign(config, {
      headers: config._retried
        ? { ...config.headers, ...localStorageAuthService.getHeader() }
        : { ...localStorageAuthService.getHeader(), ...config.headers }
    });
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    if (!response?.data) {
      return {
        success: true
      };
    }
    if (typeof response?.data === 'string') {
      response.data = JSON.parse(response.data);
    }
    response.data = {
      ...response?.data,
      success: true
    };
    return response.data;
  },
  async (error) => {
    const errorResponse = error?.response;
    if (errorResponse) {
      const errorData = errorResponse?.data;
      const originRequestConfig = error?.config;
      if (errorResponse.status === HttpStatus.UNAUTHORIZED) {
        if (!originRequestConfig?._retried) {
          const isTokenExpired = errorData?.errors?.[0]?.key === 'token_expired';
          if (isTokenExpired) {
            if (!refreshingPromise) {
              await throttled();
            }
            return axiosInstance({ ...originRequestConfig, _retried: true });
          }
        }
        logout(true);
      }

      if (typeof errorData === 'string') {
        Object.assign(error.response.data, JSON.parse(error.response.data));
      }
      if (errorData) {
        Object.assign(error.response.data, {
          success: false
        });
      }

      return error.response.data as IBodyResponse<unknown>;
    }
    if (error.request) {
      error.request.data = {
        ...(error?.request?.data || {}),
        success: false,
        message: error.message
      };
      return error.request?.data;
    }
    return {
      ...error,
      success: false,
      message: 'System error, please try again later',
      data: null
    };
  }
);

export default axiosInstance;
export * from './api';
export * from './helper';
