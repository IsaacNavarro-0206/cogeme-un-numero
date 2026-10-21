import { axiosInstance } from "@/config/axiosConfig";

interface UpdateUser {
  nombre: string;
  correoElectronico: string;
  telefono: string;
  contraseña?: string;
}

export function UpdateUser(data: UpdateUser, id: string | undefined) {
  return axiosInstance.patch(`/user/${id}`, data);
}

export function DeleteUser(id: number) {
  return axiosInstance.delete(`/user/${id}`);
}

export function GetUser(id: number) {
  return axiosInstance.get(`/user/${id}`);
}
