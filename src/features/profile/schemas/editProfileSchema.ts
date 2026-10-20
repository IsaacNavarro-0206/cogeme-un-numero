import * as yup from "yup";

export const editProfileSchema = yup.object().shape({
  name: yup.string().required("Nombre es requerido"),
  email: yup
    .string()
    .email("Correo electrónico no válido")
    .required("Correo electrónico es requerido"),
  phone: yup
    .string()
    .matches(/^[0-9]+$/, "El teléfono debe ser un número")
    .min(10, "El teléfono debe tener al menos 10 dígitos")
    .required("Teléfono es requerido"),
  password: yup
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export type EditProfileFormData = yup.InferType<typeof editProfileSchema>;
