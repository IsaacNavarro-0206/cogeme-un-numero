import { axiosInstance } from "@/config/axiosConfig";

export interface RaffleFilters {
  loteria: string;
  fechaDesde: string;
  fechaHasta: string;
}

export interface RaffleStats {
  porEstado: { pendiente: number; aceptado: number; rechazado: number };
  ocupados: number;
  disponibles: number;
  porcentajeVendido: number;
  recaudado: number;
  porDia: { fecha: string; total: number }[];
}

export interface RaffleSummary {
  id: string;
  premio: string;
  fechaRifa: string;
  vendidos: number;
  porcentajeVendido: number;
  recaudado: number;
}

export interface UserRafflesStats {
  totalRifas: number;
  totalVendidos: number;
  totalRecaudado: number;
  rifas: RaffleSummary[];
}

export function CreateRaffle(data: CreateRaffleType) {
  return axiosInstance.post("/raffle", data);
}

export function UpdateRaffle(data: UpdateRaffleType, id: string | undefined) {
  return axiosInstance.patch(`/raffle/${id}`, data);
}

export function DeleteRaffle(id: string) {
  return axiosInstance.delete(`/raffle/${id}`);
}

export interface GetRafflesParams extends Partial<RaffleFilters> {
  limit: number;
  offset: number;
}

export function GetRaffles(params: GetRafflesParams) {
  return axiosInstance.get<PaginatedResponse<Raffle>>("/raffle", { params });
}

export function GetRaffle(id: string) {
  return axiosInstance.get(`/raffle/${id}`);
}

export function GetRaffleStats(id: string) {
  return axiosInstance.get<RaffleStats>(`/raffle/${id}/stats`);
}

export function GetUserRafflesStats() {
  return axiosInstance.get<UserRafflesStats>("/raffle/stats");
}
