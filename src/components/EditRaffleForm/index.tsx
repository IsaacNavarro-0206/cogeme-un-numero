import { toast } from "sonner";
import RaffleForm from "../RaffleForm";
import { useNavigate, useParams } from "react-router-dom";
import { useRaffleStore } from "@/store/raffles/slice";

const EditRaffleForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { updateRaffle, isLoading, error } = useRaffleStore();

  const onSubmit = async (data: RaffleDataForm) => {
    const obj = {
      premio: data.prize,
      loteria: data.lottery,
      fechaRifa: data.drawDate,
      numeroMaximo: data.maxNumber,
      precioNumero: data.precioNumero,
    };

    updateRaffle(id, obj);

    if (!error) {
      toast.success("¡Rifa actualizada!", {
        description: "La rifa se ha actualizado correctamente",
      });

      navigate("/my-raffles");
    } else {
      toast.error("Error", {
        description: "No se pudo actualizar la rifa",
      });
    }
  };

  return (
    <RaffleForm onSubmit={onSubmit} isEditMode={true} isLoading={isLoading} />
  );
};

export default EditRaffleForm;
