import { useMutation } from "@tanstack/react-query";
import { Login, Signup } from "../services/auth";
import { toast } from "sonner";

export const useLogin = () => {
  return useMutation({
    mutationFn: Login,
    onSuccess: () => {
      toast.success("¡Bienvenido!", {
        description: "Has iniciado sesión correctamente",
      });
    },
    onError: (error) => {
      toast.error("Error", {
        description: "Ha ocurrido un error al iniciar sesión",
      });
      console.error("There was an error to login", error);
    },
  });
};

export const useSignup = () => {
  return useMutation({
    mutationFn: Signup,
    onSuccess: () => {
      toast.success("¡Registro exitoso!", {
        description: "Tu cuenta ha sido creada correctamente",
      });
    },
    onError: (error) => {
      toast.error("Error", {
        description: "Ha ocurrido un error al registrarse",
      });
      console.error("There was an error to signup", error);
    },
  });
};
