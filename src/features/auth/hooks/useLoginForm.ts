import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLogin } from "./useAuth";
import { loginSchema, LoginFormData } from "../schemas/loginSchema";
import { useAuthStore } from "@/store/auth/slice";

export const useLoginForm = () => {
  const { mutate: login, isPending: isLoading } = useLogin();
  const setAuth = useAuthStore((state) => state.setAuth);

  const form = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    mode: "onChange",
  });

  const onSubmit = (data: LoginFormData) => {
    login(
      { correoElectronico: data.email, contraseña: data.password },
      {
        onSuccess: ({ data: response }) => {
          setAuth(response.access_token, response.refresh_token);
        },
      },
    );
  };

  return { form, onSubmit, isLoading };
};
