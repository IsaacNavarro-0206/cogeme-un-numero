"use client";

import {
  useTable,
  type ColumnDef,
  type OnChangeFn,
  type PaginationState,
  type RowData,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { features, type DataTableFeatures } from "./data-table-features";
import { DataTablePagination } from "./pagination";

interface DataTableProps<TData extends RowData> {
  columns: ColumnDef<DataTableFeatures, TData>[];
  data: TData[];
  /**
   * Paginación en el servidor: si se pasa, la tabla no pagina en cliente y
   * solo muestra `data` (la página actual) usando `rowCount` como total.
   */
  serverPagination?: {
    rowCount: number;
    pagination: PaginationState;
    onPaginationChange: OnChangeFn<PaginationState>;
  };
}

export function DataTable<TData extends RowData>({
  columns,
  data,
  serverPagination,
}: DataTableProps<TData>) {
  const table = useTable({
    features,
    data,
    columns,
    ...(serverPagination && {
      manualPagination: true,
      rowCount: serverPagination.rowCount,
      state: { pagination: serverPagination.pagination },
      onPaginationChange: serverPagination.onPaginationChange,
    }),
  });

  return (
    <div className="overflow-hidden rounded-md border">
      <Table>
        <TableHeader>
          {table.getFlatHeaders().map((header) => (
            <TableHead
              key={header.id}
              id={header.id}
              isRowHeader={header.index === 0}
              className="text-center"
            >
              {header.isPlaceholder ? null : (
                <table.FlexRender header={header} />
              )}
            </TableHead>
          ))}
        </TableHeader>
        <TableBody renderEmptyState={() => "Sin resultados."}>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id} id={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id} className="text-center">
                  <table.FlexRender cell={cell} />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <DataTablePagination table={table} />
    </div>
  );
}
