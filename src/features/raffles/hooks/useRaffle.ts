import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  GetRaffle,
  GetRaffles,
  CreateRaffle,
  UpdateRaffle,
  DeleteRaffle,
} from "@/service/raffle";

export const useRaffle = (id: number) => {
  return useQuery({
    queryKey: ["raffle", id],
    queryFn: () => GetRaffle(id).then((res) => res.data),
    enabled: !!id, // Evita que se ejecute si no hay ID
  });
};

export const useRaffles = () => {
  return useQuery({
    queryKey: ["raffles", "user"],
    queryFn: () => GetRaffles().then((res) => res.data),
  });
};

export const useCreateRaffle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: CreateRaffle,
    onSuccess: () => {
      // Invalida las queries para que la lista de rifas se actualice automáticamente
      queryClient.invalidateQueries({ queryKey: ["raffles"] });
    },
  });
};

export const useUpdateRaffle = () => {
  const queryClient = useQueryClient();

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
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => DeleteRaffle(id),
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
