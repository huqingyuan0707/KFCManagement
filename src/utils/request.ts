import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios';
import { ElMessage } from 'element-plus';

const instance: AxiosInstance = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  (error) => {
    const message = error.response?.data?.message || error.message || '请求失败';
    ElMessage.error(message);
    return Promise.reject(error);
  }
);

export default instance;

export const request = <T = unknown>(config: AxiosRequestConfig): Promise<T> => {
  return instance.request(config);
};

export const get = <T = unknown>(url: string, params?: unknown): Promise<T> => {
  return instance.get(url, { params });
};

export const post = <T = unknown>(url: string, data?: unknown): Promise<T> => {
  return instance.post(url, data);
};

export const put = <T = unknown>(url: string, data?: unknown): Promise<T> => {
  return instance.put(url, data);
};

export const del = <T = unknown>(url: string, params?: unknown): Promise<T> => {
  return instance.delete(url, { params });
};