import axios from "axios";
import { parseCookies } from "nookies";

const { "auth.token": token } = parseCookies();

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    Authorization: token ? `Bearer ${token}` : "",
  },
});

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

export const apiForm = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    Authorization: token ? `Bearer ${token}` : "",
    "Content-Type": "multipart/form-data",
  },
});
