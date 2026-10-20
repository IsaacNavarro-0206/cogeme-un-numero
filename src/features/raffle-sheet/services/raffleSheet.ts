import { axiosInstance } from "@/config/axiosConfig";

interface ChoosenNumberData {
  numero: number;
  raffleId: number;
  nombre: string;
  numeroDeContacto: string;
}

export interface ChoosenNumber extends ChoosenNumberData {
  id: number;
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

export function UpdateStatusChoosenNumber(data: StatusData, id: number) {
  return axiosInstance.patch(`/choosen-number/${id}`, data);
}

export function GetChoosenNumbers(id: string | undefined) {
  return axiosInstance.get<ChoosenNumber[]>(`/choosen-number/raffle/${id}`, {
    _skipAuth: true,
  });
}

export function GetChoosenNumber(id: number) {
  return axiosInstance.get(`/choosen-number/${id}`);
}
