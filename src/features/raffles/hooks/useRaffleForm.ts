import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router-dom";
import { useCreateRaffle, useRaffle, useUpdateRaffle } from "./useRaffle";
import { raffleSchema, RaffleFormData } from "../schemas/raffleSchema";

export const useRaffleForm = (isEditMode: boolean = false) => {
  const { mutate: createRaffle, isPending: isLoadingCreate } =
    useCreateRaffle();
  const { mutate: updateRaffle, isPending: isLoadingUpdate } =
    useUpdateRaffle();

  const { id } = useParams();
  const { data } = useRaffle(String(id));
  const navigate = useNavigate();

  const form = useForm<RaffleFormData>({
    resolver: yupResolver(raffleSchema),
    mode: "onChange",
  });

  const { setValue } = form;

  useEffect(() => {
    const raffle = data;
    if (!raffle) return;

    if (isEditMode) {
      setValue("prize", raffle.premio);
      setValue("lottery", raffle.loteria);
      setValue("drawDate", raffle.fechaRifa);
      setValue("maxNumber", raffle.numeroMaximo);
      setValue("precioNumero", raffle.precioNumero);
    }
  }, [data, setValue, isEditMode]);

  const handleFormSubmit = (data: RaffleFormData) => {
    const raffleData = {
      precioNumero: data.precioNumero,
      premio: data.prize,
      loteria: data.lottery,
      fechaRifa: data.drawDate,
      numeroMaximo: data.maxNumber,
    };

    if (isEditMode) {
      updateRaffle(
        { data: raffleData, id },
        {
          onSuccess: () => {
            navigate("/my-raffles");
          },
        },
      );
    } else {
      createRaffle(raffleData, {
        onSuccess: () => {
          navigate("/my-raffles");
        },
      });
    }
  };

  return {
    form,
    onSubmit: handleFormSubmit,
    isLoading: isLoadingCreate || isLoadingUpdate,
    data,
  };
};
