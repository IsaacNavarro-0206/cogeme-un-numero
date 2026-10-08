import {
  CalendarDays,
  CircleDollarSign,
  Edit2,
  Eye,
  Gift,
  PlusCircle,
  Share2,
  Ticket,
  Trash2,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { getUserId } from "@/utils/auth";
import { useRaffleStore } from "@/store/raffles/slice";

interface RaffleCardProps {
  raffles: Raffle[];
}

const RaffleCard: React.FC<RaffleCardProps> = () => {
  const { toast } = useToast();
  const [raffleToDelete, setRaffleToDelete] = useState<number>(0);
  const { pathname } = useLocation();

  const { error, deleteRaffleZ, raffles, setRaffles } = useRaffleStore();

  const deleteRaffle = async () => {
    // Store current state for potential rollback
    const previousRaffles = [...raffles];

    deleteRaffleZ(raffleToDelete);

    if (!error) {
      toast({
        title: "Éxito",
        description: "Rifa eliminada correctamente",
      });
    } else {
      setRaffles(previousRaffles);

      toast({
        title: "Error",
        content: "Error al eliminar la rifa",
        variant: "destructive",
      });
    }
  };

  const alertDialogDelete = (id: number) => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="destructive"
          size="icon"
          onClick={() => setRaffleToDelete(id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>

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

          <AlertDialogAction onClick={deleteRaffle} className="bg-destructive">
            Eliminar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );

  const shareLinkRaffleSheet = (
    raffleId: number,
    userId: string | undefined
  ) => {
    const link = `${window.location.origin}/choose-number/${raffleId}/${userId}`;

    navigator.clipboard
      .writeText(link)
      .then(() => {
        toast({
          title: "Enlace copiado",
          description:
            "El enlace para seleccionar número ha sido copiado al portapapeles.",
        });
      })
      .catch(() => {
        toast({
          title: "Error",
          description:
            "No se pudo copiar el enlace. Por favor, inténtalo de nuevo.",
          variant: "destructive",
        });
      });
  };

  return raffles.length === 0 ? (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
      <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <Ticket className="w-8 h-8 text-pink-600" />
      </div>

      <h2 className="text-xl font-semibold text-gray-900 mb-2">
        No tienes rifas creadas
      </h2>

      <p className="text-gray-500 mb-6">
        Comienza creando tu primera rifa y empieza a ganar premios
      </p>

      <Link
        to="/create-raffle"
        className="inline-flex items-center px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
      >
        <PlusCircle className="w-4 h-4 mr-2" />
        Crear mi primera rifa
      </Link>
    </div>
  ) : (
    <div className="space-y-4">
      {raffles.map((raffle) => (
        <div
          key={raffle.id}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 transition-all hover:shadow-md"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center">
                <div className="w-5 h-5 mt-1 mr-2 text-gray-400">
                  <CalendarDays className="w-5 h-5" />
                </div>

                <p className="text-sm text-gray-500">
                  Fecha de juego: {raffle.fechaRifa}
                </p>
              </div>

              <div className="flex items-center">
                <div className="w-5 h-5 mt-1 mr-2 text-gray-400">
                  <Ticket className="w-5 h-5" />
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Lotería a jugar: {raffle.loteria}
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-5 h-5 mt-1 mr-2 text-gray-400">
                  <Gift className="w-5 h-5" />
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Premio: {raffle.premio}
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-5 h-5 mt-1 mr-2 text-gray-400">
                  <CircleDollarSign className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">
                    Precio por número: {raffle.precioNumero}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 md:border-l md:pl-6">
              <Link to={pathname} state={{ raffle }}>
                <Button
                  className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-orange-50 text-orange-600 hover:bg-orange-100 transition-colors"
                  onClick={() => shareLinkRaffleSheet(raffle.id, getUserId())}
                >
                  <Share2 className="w-4 h-4" />
                </Button>
              </Link>

              <Link to={`/edit-raffle/${raffle.id}`} state={{ raffle }}>
                <Button className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors">
                  <Edit2 className="w-4 h-4" />
                </Button>
              </Link>

              <Link to={`/my-raffle/${raffle.id}`} state={{ raffle }}>
                <Button className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors">
                  <Eye className="w-4 h-4" />
                </Button>
              </Link>

              {alertDialogDelete(raffle.id)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RaffleCard;
