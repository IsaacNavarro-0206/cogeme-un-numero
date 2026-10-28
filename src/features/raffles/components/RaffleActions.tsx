import { Edit2, Eye, Share2, Trash2 } from "lucide-react";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { getUserId } from "@/utils/auth";
import { useDeleteRaffle } from "../hooks";

interface RaffleActionsProps {
  raffle: Raffle;
}

const RaffleActions: React.FC<RaffleActionsProps> = ({ raffle }) => {
  const deleteRaffleMutation = useDeleteRaffle();

  const shareLinkRaffleSheet = () => {
    const link = `${window.location.origin}/choose-number/${raffle.id}/${getUserId()}`;

    navigator.clipboard
      .writeText(link)
      .then(() => {
        toast.success("Enlace copiado", {
          description:
            "El enlace para seleccionar número ha sido copiado al portapapeles.",
        });
      })
      .catch(() => {
        toast.error("Error", {
          description:
            "No se pudo copiar el enlace. Por favor, inténtalo de nuevo.",
        });
      });
  };

  return (
    <div className="flex items-center justify-center gap-2">
      <Button
        className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-orange-50 text-orange-600 hover:bg-orange-100 transition-colors"
        onClick={shareLinkRaffleSheet}
      >
        <Share2 className="w-4 h-4" />
      </Button>

      <Link
        to={`/edit-raffle/${raffle.id}`}
        className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
      >
        <Edit2 className="w-4 h-4" />
      </Link>

      <Link
        to={`/my-raffle/${raffle.id}`}
        state={{ raffle }}
        className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors"
      >
        <Eye className="w-4 h-4" />
      </Link>

      <AlertDialogTrigger>
        <Button variant="destructive" size="icon">
          <Trash2 className="h-4 w-4" />
        </Button>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>

            <AlertDialogDescription>
              Esta acción no se puede deshacer. Se eliminará la rifa
              permanentemente.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>

            <AlertDialogAction
              onPress={() => deleteRaffleMutation.mutate(raffle.id)}
              className="bg-destructive"
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogTrigger>
    </div>
  );
};

export default RaffleActions;
