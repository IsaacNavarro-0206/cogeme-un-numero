import { useQuery, useMutation } from "@tanstack/react-query";
import {
  ChoosenNumbers,
  UpdateStatusChoosenNumber,
  GetChoosenNumbers,
  GetChoosenNumber,
} from "../services/raffleSheet";
import { queryClient } from "@/config/queryClient";

export const useGetChoosenNumber = (id: number) => {
  return useQuery({
    queryKey: ["choosen-number", id],
    queryFn: () => GetChoosenNumber(id).then((res) => res.data),
    enabled: !!id,
    staleTime: 1000 * 30,
  });
};

export const useGetChoosenNumbers = (raffleId: string | undefined) => {
  return useQuery({
    queryKey: ["choosen-numbers", "raffle", raffleId],
    queryFn: () => GetChoosenNumbers(raffleId).then((res) => res.data),
    enabled: !!raffleId,
    // Otros usuarios pueden apartar números en cualquier momento
    staleTime: 1000 * 10,
    refetchInterval: 1000 * 15,
  });
};

export const useChoosenNumbers = () => {
  return useMutation({
    mutationFn: ChoosenNumbers,
    onSuccess: (response) => {
      // Asumiendo que la respuesta trae el raffleId del número comprado
      const raffleId = response.data?.raffleId;
      if (raffleId) {
        queryClient.invalidateQueries({
          queryKey: ["choosen-numbers", "raffle", String(raffleId)],
        });
      } else {
        queryClient.invalidateQueries({ queryKey: ["choosen-numbers"] });
      }
    },
  });
};

export const useUpdateStatusChoosenNumber = () => {
  return useMutation({
    mutationFn: ({ data, id }: { data: any; id: number }) =>
      UpdateStatusChoosenNumber(data, id),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["choosen-number", variables.id],
      });
      queryClient.invalidateQueries({ queryKey: ["choosen-numbers"] });
    },
  });
};
