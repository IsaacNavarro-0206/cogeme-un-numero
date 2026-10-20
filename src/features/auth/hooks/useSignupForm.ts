import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSignup } from "./useAuth";
import { signupSchema, SignupFormData } from "../schemas/signupSchema";
import { useNavigate } from "react-router-dom";

export const useSignupForm = () => {
  const { mutate: signup, isPending: isLoading } = useSignup();
  const navigate = useNavigate();

  const form = useForm<SignupFormData>({
    resolver: yupResolver(signupSchema),
    mode: "onChange",
  });

  const onSubmit = (data: SignupFormData) => {
    const obj = {
      nombre: data.name,
      correoElectronico: data.email,
      contraseña: data.password,
      telefono: data.phone,
    };

    signup(obj, { onSuccess: () => navigate("/login") });
  };

  return { form, onSubmit, isLoading };
};
