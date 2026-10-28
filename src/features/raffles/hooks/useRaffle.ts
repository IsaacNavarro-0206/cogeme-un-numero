import { useQuery, useMutation, keepPreviousData } from "@tanstack/react-query";
import type { PaginationState } from "@tanstack/react-table";
import { toast } from "sonner";
import {
  GetRaffle,
  GetRaffles,
  CreateRaffle,
  UpdateRaffle,
  DeleteRaffle,
} from "../services/raffle";
import { queryClient } from "@/config/queryClient";

export const useRaffle = (id: string) => {
  return useQuery({
    queryKey: ["raffle", id],
    queryFn: () => GetRaffle(id).then((res) => res.data),
    enabled: !!id, // Evita que se ejecute si no hay ID
  });
};

export const useRaffles = ({ pageIndex, pageSize }: PaginationState) => {
  return useQuery({
    queryKey: ["raffles", "user", { pageIndex, pageSize }],
    queryFn: () =>
      GetRaffles({ limit: pageSize, offset: pageIndex * pageSize }).then(
        (res) => res.data,
      ),
    // Mantiene la página anterior visible mientras carga la siguiente
    placeholderData: keepPreviousData,
  });
};

export const useCreateRaffle = () => {
  return useMutation({
    mutationFn: CreateRaffle,
    onSuccess: () => {
      // Invalida las queries para que la lista de rifas se actualice automáticamente
      queryClient.invalidateQueries({ queryKey: ["raffles"] });
    },
  });
};

export const useUpdateRaffle = () => {
  return useMutation({
    mutationFn: ({ data, id }: { data: any; id: string | undefined }) =>
      UpdateRaffle(data, id),
    onSuccess: (_, variables) => {
      // Actualiza la lista general y la rifa específica en caché
      queryClient.invalidateQueries({ queryKey: ["raffles"] });
      queryClient.invalidateQueries({ queryKey: ["raffle", variables.id] });
    },
  });
};

export const useDeleteRaffle = () => {
  return useMutation({
    mutationFn: (id: string) => DeleteRaffle(id),
    onSuccess: () => {
      toast.success("Éxito", {
        description: "Rifa eliminada correctamente",
      });
      queryClient.invalidateQueries({ queryKey: ["raffles"] });
    },
    onError: () => {
      toast.error("Error", {
        description: "Error al eliminar la rifa",
      });
    },
  });
};
