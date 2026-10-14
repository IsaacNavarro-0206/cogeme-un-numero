import RaffleForm from "../RaffleForm";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { getUserId } from "@/utils/auth";
import { useRaffleStore } from "@/store/raffles/slice";

const CreateRaffleForm = () => {
  const navigate = useNavigate();
  const { addRaffle, isLoading, error } = useRaffleStore();

  const onSubmit = async (data: RaffleDataForm) => {
    const obj = {
      usuarioId: Number(getUserId()),
      premio: data.prize,
      loteria: data.lottery,
      fechaRifa: data.drawDate,
      numeroMaximo: data.maxNumber,
      precioNumero: data.precioNumero,
    };

    addRaffle(obj);

    if (!error) {
      toast.success("¡Rifa creada!", {
        description: "La rifa se ha creado correctamente",
      });

      navigate("/my-raffles");
    } else {
      toast.error("Error", {
        description: "No se pudo crear la rifa",
      });
    }
  };

  return <RaffleForm onSubmit={onSubmit} isLoading={isLoading} />;
};

export default CreateRaffleForm;
