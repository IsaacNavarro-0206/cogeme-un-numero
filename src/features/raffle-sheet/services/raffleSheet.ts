import { axiosInstance } from "@/config/axiosConfig";

interface ChoosenNumberData {
  numero: number;
  raffleId: number;
  nombre: string;
  numeroDeContacto: string;
}

interface StatusData {
  estado: string;
}

// 1. Elegir un número (Acción pública, salta el token y maneja errores correctamente)
export function ChoosenNumbers(data: ChoosenNumberData) {
  return axiosInstance.post("/choosen-number", data, {
    _skipAuth: true,
  });
}

// 2. Actualizar el estado de un número (Requiere token automático)
export function UpdateStatusChoosenNumber(data: StatusData, id: number) {
  return axiosInstance.patch(`/choosen-number/${id}`, data);
}

// 3. Obtener números de una rifa (Consulta pública, salta el token de forma segura)
export function GetChoosenNumbers(id: string | undefined) {
  return axiosInstance.get(`/choosen-number/raffle/${id}`, {
    _skipAuth: true,
  });
}

// 4. Obtener el detalle de un número elegido (Requiere token automático)
export function GetChoosenNumber(id: number) {
  return axiosInstance.get(`/choosen-number/${id}`);
}
