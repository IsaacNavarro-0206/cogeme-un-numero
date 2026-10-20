import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { GetUser, UpdateUser, DeleteUser } from "../services/profile";

export const useGetUser = (id: number) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => GetUser(id).then((res) => res.data),
    enabled: !!id, // No ejecuta la petición si el ID no es válido
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ data, id }: { data: any; id: string | undefined }) =>
      UpdateUser(data, id),
    onSuccess: (_, variables) => {
      toast.success("¡Actualización exitosa!", {
        description: "Tu cuenta ha sido actualizada correctamente",
      });
      queryClient.invalidateQueries({
        queryKey: ["user", Number(variables.id)],
      });
    },
    onError: () => {
      toast.error("Error", {
        description:
          "No se pudo actualizar el perfil. Por favor intenta nuevamente",
      });
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: DeleteUser,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["user", id] });
    },
  });
};
