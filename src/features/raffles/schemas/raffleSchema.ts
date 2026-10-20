import * as yup from "yup";

export const raffleSchema = yup.object().shape({
  lottery: yup.string().required("Lotería es requerida"),
  prize: yup.string().required("Premio es requerido"),
  maxNumber: yup
    .number()
    .typeError("Debe ser un número")
    .positive("Debe ser un número positivo")
    .integer("Debe ser un número entero")
    .required("Número máximo es requerido"),
  drawDate: yup.string().required("Fecha de juego es requerida"),
  precioNumero: yup
    .number()
    .typeError("Debe ser un número")
    .positive("Debe ser un número positivo")
    .required("Precio del número es requerido"),
});

export type RaffleFormData = yup.InferType<typeof raffleSchema>;
