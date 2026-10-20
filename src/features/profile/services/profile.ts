import { axiosInstance } from "@/config/axiosConfig";

interface UpdateUser {
  nombre: string;
  correoElectronico: string;
  telefono: string;
  contraseña?: string;
}

// 1. Modifica los datos del usuario (Requiere token automático)
export function UpdateUser(data: UpdateUser, id: string | undefined) {
  return axiosInstance.patch(`/user/${id}`, data);
}

// 2. Elimina un usuario (Requiere token automático)
export function DeleteUser(id: number) {
  return axiosInstance.delete(`/user/${id}`);
}

// 3. Obtiene un usuario. Ahora usa la instancia para validar errores y heredar el token
export function GetUser(id: number) {
  return axiosInstance.get(`/user/${id}`);
}
