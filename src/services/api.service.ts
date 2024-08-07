// src/services/api.service.ts
import axios from "axios";
import { parseCookies } from "nookies";

const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:3000';
console.log('Base URL:', baseURL);

export const api = axios.create({
  baseURL: baseURL,
});

api.interceptors.request.use(
  (config) => {
    const { "auth.token": token } = parseCookies();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export const apiForm = axios.create({
  baseURL: baseURL,
});

apiForm.interceptors.request.use(
  (config) => {
    const { "auth.token": token } = parseCookies();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      config.headers["Content-Type"] = "multipart/form-data";
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const HandleError = (error: any) => {
  console.error("Falha na requisição", error);
};

export async function apiRequest<T>(
  method: "get" | "post" | "put" | "delete",
  endpoint: string,
  data?: any
): Promise<T> {
  try {
    const response = await api[method](endpoint, data);

    if (response && response.data) {
      return response.data as T;
    } else {
      throw new Error("Falha na requisição");
    }
  } catch (error) {
    HandleError(error);
    throw error;
  }
}
