import axios, { AxiosRequestConfig } from "axios";
import type { AxiosResponse } from "axios";

const URL = process.env.NEXT_PUBLIC_BASE_URL;

export const axiosPost = async <T>(
  apiURL: string,
  data: T,
  config?: AxiosRequestConfig
): Promise<AxiosResponse> => {
  return axios.post(`${URL}/${apiURL}`, data, config);
};

export const axiosGet = async <T>(
  apiURL: string,
  params?: T,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<T>> => {
  return axios.get(`${URL}/${apiURL}`, {
    params,
    ...config,
  });
};
