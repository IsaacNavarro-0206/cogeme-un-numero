import * as yup from "yup";

export const raffleSheetSchema = yup.object().shape({
  name: yup.string().required("Nombre es requerido"),
  phone: yup
    .string()
    .matches(/^[0-9]+$/, "El teléfono debe ser un número")
    .min(10, "El teléfono debe tener al menos 10 dígitos")
    .required("Teléfono es requerido"),
});

export type RaffleSheetFormData = yup.InferType<typeof raffleSheetSchema>;
