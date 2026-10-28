import { axiosInstance } from "@/config/axiosConfig";

export function CreateRaffle(data: CreateRaffleType) {
  return axiosInstance.post("/raffle", data);
}

export function UpdateRaffle(data: UpdateRaffleType, id: string | undefined) {
  return axiosInstance.patch(`/raffle/${id}`, data);
}

export function DeleteRaffle(id: string) {
  return axiosInstance.delete(`/raffle/${id}`);
}

export function GetRaffles(params: { limit: number; offset: number }) {
  return axiosInstance.get<PaginatedResponse<Raffle>>("/raffle", { params });
}

export function GetRaffle(id: string) {
  return axiosInstance.get(`/raffle/${id}`);
}
