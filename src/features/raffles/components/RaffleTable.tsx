import type {
  ColumnDef,
  OnChangeFn,
  PaginationState,
} from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import type { DataTableFeatures } from "@/components/ui/data-table-features";
import RaffleActions from "./RaffleActions";

const columns: ColumnDef<DataTableFeatures, Raffle>[] = [
  { accessorKey: "fechaRifa", header: "Fecha de juego" },
  { accessorKey: "loteria", header: "Lotería" },
  { accessorKey: "premio", header: "Premio" },
  { accessorKey: "precioNumero", header: "Precio por número" },
  { accessorKey: "numeroMaximo", header: "Números" },
  {
    id: "acciones",
    header: "Acciones",
    cell: ({ row }) => <RaffleActions raffle={row.original} />,
  },
];

interface RaffleTableProps {
  raffles: Raffle[];
  rowCount: number;
  pagination: PaginationState;
  onPaginationChange: OnChangeFn<PaginationState>;
}

const RaffleTable = ({
  raffles,
  rowCount,
  pagination,
  onPaginationChange,
}: RaffleTableProps) => {
  return (
    <DataTable
      columns={columns}
      data={raffles}
      serverPagination={{ rowCount, pagination, onPaginationChange }}
    />
  );
};

export default RaffleTable;
