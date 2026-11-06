import { axiosInstance } from "@/config/axiosConfig";

interface ChoosenNumberData {
  numero: number;
  raffleId: string;
  nombre: string;
  numeroDeContacto: string;
}

export interface ChoosenNumber extends ChoosenNumberData {
  id: string;
  estado: string;
}

interface StatusData {
  estado: string;
}

export function ChoosenNumbers(data: ChoosenNumberData) {
  return axiosInstance.post("/choosen-number", data, {
    _skipAuth: true,
  });
}

export function UpdateStatusChoosenNumber(data: StatusData, id: string) {
  return axiosInstance.patch(`/choosen-number/${id}`, data);
}

export function GetChoosenNumbers(
  id: string | undefined,
  estado?: "pendiente" | "aceptado" | "rechazado",
) {
  return axiosInstance.get<ChoosenNumber[]>(`/choosen-number/raffle/${id}`, {
    _skipAuth: true,
    ...(estado ? { params: { estado } } : {}),
  });
}

export function GetChoosenNumber(id: string) {
  return axiosInstance.get(`/choosen-number/${id}`);
}
