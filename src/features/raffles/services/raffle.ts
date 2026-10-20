import { axiosInstance } from "@/config/axiosConfig";

// 1. Crear una rifa (Requiere token automático)
export function CreateRaffle(data: CreateRaffleType) {
  return axiosInstance.post("/raffle", data);
}

// 2. Actualizar una rifa (Requiere token automático)
export function UpdateRaffle(data: UpdateRaffleType, id: string | undefined) {
  return axiosInstance.patch(`/raffle/${id}`, data);
}

// 3. Eliminar una rifa (Requiere token automático)
export function DeleteRaffle(id: number) {
  return axiosInstance.delete(`/raffle/${id}`);
}

// 4. Obtener las rifas de un usuario específico (Requiere token automático)
export function GetRaffles() {
  return axiosInstance.get('/raffle');
}

// 5. Obtener una rifa por ID. Ahora usa la instancia centralizada y hereda los interceptores
export function GetRaffle(id: number) {
  return axiosInstance.get(`/raffle/${id}`);
}
