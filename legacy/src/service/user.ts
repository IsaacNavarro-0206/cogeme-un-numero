import axios from "axios";
import { axiosInstance } from "./axiosConfig";

interface UpdateUser {
  nombre: string;
  correoElectronico: string;
  telefono: string;
  contraseña?: string;
}

export function UpdateUser(data: UpdateUser, id: string | undefined) {
  return axiosInstance({
    method: "PATCH",
    url: `/user/${id}`,
    data,
  });
}

export function DeleteUser(id: number) {
  return axiosInstance({
    method: "DELETE",
    url: `/user/${id}`,
  });
}

export function GetUser(id: number) {
  return axios({
    method: "GET",
    url: `/user/${id}`,
    baseURL: import.meta.env.VITE_API_URL_LOCAL,
    validateStatus: null,
  });
}
