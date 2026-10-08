import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Edit2,
  Eye,
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

const columnHelper = createColumnHelper<Raffle>();

const RaffleCard: React.FC<RaffleCardProps> = ({ raffles }) => {
  const { toast } = useToast();
  const [raffleToDelete, setRaffleToDelete] = useState<number>(0);
  const { pathname } = useLocation();
  const { error, deleteRaffleZ, raffles: storedRaffles, setRaffles } = useRaffleStore();

  const deleteRaffle = async () => {
    const previousRaffles = [...storedRaffles];
    deleteRaffleZ(raffleToDelete);

    if (!error) {
      toast({ title: "Éxito", description: "Rifa eliminada correctamente" });
    } else {
      setRaffles(previousRaffles);
      toast({
        title: "Error",
        description: "Error al eliminar la rifa",
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
          aria-label="Eliminar rifa"
          onClick={() => setRaffleToDelete(id)}
        >
          <Trash2 data-icon="inline-start" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no se puede deshacer. Se eliminará la rifa permanentemente.
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

  const shareLinkRaffleSheet = (raffleId: number, userId: string | undefined) => {
    const link = `${window.location.origin}/choose-number/${raffleId}/${userId}`;

    navigator.clipboard.writeText(link).then(
      () => toast({ title: "Enlace copiado", description: "El enlace para seleccionar número ha sido copiado al portapapeles." }),
      () => toast({ title: "Error", description: "No se pudo copiar el enlace. Por favor, inténtalo de nuevo.", variant: "destructive" }),
    );
  };

  const columns = [
    columnHelper.accessor("fechaRifa", { header: "Fecha de juego" }),
    columnHelper.accessor("loteria", { header: "Lotería" }),
    columnHelper.accessor("premio", { header: "Premio" }),
    columnHelper.accessor("precioNumero", { header: "Precio por número" }),
    columnHelper.display({
      id: "actions",
      header: "Acciones",
      cell: ({ row }) => {
        const raffle = row.original;
        return (
          <div className="flex items-center justify-end gap-2">
            <Link to={pathname} state={{ raffle }}>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Compartir rifa"
                className="text-orange-600 hover:bg-orange-50 hover:text-orange-700"
                onClick={() => shareLinkRaffleSheet(raffle.id, getUserId())}
              >
                <Share2 data-icon="inline-start" />
              </Button>
            </Link>
            <Link to={`/edit-raffle/${raffle.id}`} state={{ raffle }}>
              <Button variant="ghost" size="icon" aria-label="Editar rifa" className="text-blue-600 hover:bg-blue-50 hover:text-blue-700">
                <Edit2 data-icon="inline-start" />
              </Button>
            </Link>
            <Link to={`/my-raffle/${raffle.id}`} state={{ raffle }}>
              <Button variant="ghost" size="icon" aria-label="Ver rifa" className="text-muted-foreground hover:bg-muted">
                <Eye data-icon="inline-start" />
              </Button>
            </Link>
            {alertDialogDelete(raffle.id)}
          </div>
        );
      },
    }),
  ];

  const table = useReactTable({ data: raffles, columns, getCoreRowModel: getCoreRowModel() });

  if (raffles.length === 0) {
    return (
      <div className="rounded-xl border bg-card p-8 text-center shadow-sm">
        <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-pink-100">
          <Ticket className="size-8 text-pink-600" />
        </div>
        <h2 className="mb-2 text-xl font-semibold">No tienes rifas creadas</h2>
        <p className="mb-6 text-muted-foreground">Comienza creando tu primera rifa y empieza a ganar premios</p>
        <Link to="/create-raffle" className="inline-flex items-center rounded-lg bg-pink-600 px-4 py-2 text-white transition-colors hover:bg-pink-700">
          <PlusCircle data-icon="inline-start" />
          Crear mi primera rifa
        </Link>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] caption-bottom text-sm">
          <thead className="border-b bg-muted/50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="h-12 px-4 text-left align-middle font-medium text-muted-foreground last:text-right">
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border-b transition-colors hover:bg-muted/40 last:border-0">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="p-4 align-middle last:text-right">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RaffleCard;
export type { RaffleCardProps };
