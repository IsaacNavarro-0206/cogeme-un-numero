import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useGetUser, useUpdateUser } from "./useProfile";
import {
  editProfileSchema,
  EditProfileFormData,
} from "../schemas/editProfileSchema";

export const useEditProfileForm = (userId: string | undefined) => {
  const [isEnableInputs, setIsEnableInputs] = useState(false);

  const { data: user } = useGetUser(String(userId));
  const updateUserMutation = useUpdateUser();

  const form = useForm<EditProfileFormData>({
    resolver: yupResolver(editProfileSchema),
    mode: "onChange",
  });

  const { setValue, reset } = form;

  useEffect(() => {
    if (user && !isEnableInputs) {
      setValue("name", user.nombre);
      setValue("email", user.correoElectronico);
      setValue("phone", user.telefono);
    }
  }, [user, setValue, isEnableInputs]);

  const onSubmit = (data: EditProfileFormData) => {
    const obj = {
      nombre: data.name,
      correoElectronico: data.email,
      contraseña: data.password,
      telefono: data.phone,
    };

    setIsEnableInputs(false);
    updateUserMutation.mutate({ data: obj, id: userId });
    reset();
  };

  return {
    form,
    isEnableInputs,
    setIsEnableInputs,
    onSubmit,
    isLoading: updateUserMutation.isPending,
  };
};
