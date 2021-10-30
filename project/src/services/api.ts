import axios, {AxiosInstance, AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios';
import { getToken } from './token';

const BACKEND_URL = 'https://8.react.pages.academy/six-cities';
const REQUEST_TIMEOUT = 5000;

enum HttpCode {
  Unauthorized = 401,
}

type onUnauthorizedCallback = () => void;

export const CreateApi = (onUnauthorized: onUnauthorizedCallback): AxiosInstance => {

  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
      const {response} = error;

      if (response?.status === HttpCode.Unauthorized) {
        return onUnauthorized();
      }
      return error;
    },
  );

  api.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      const token = getToken();

      if (token) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        config.headers['x-token'] = token;
      }
      return config;
    },
  );
  return api;
};