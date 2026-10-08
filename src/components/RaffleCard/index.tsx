import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Download, Edit2, Eye, PlusCircle, Search, Share2, Ticket, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { getUserId } from "@/utils/auth";
import { useRaffleStore } from "@/store/raffles/slice";

interface RaffleCardProps { raffles: Raffle[] }
const columnHelper = createColumnHelper<Raffle>();

const RaffleCard: React.FC<RaffleCardProps> = ({ raffles }) => {
  const { toast } = useToast();
  const { pathname } = useLocation();
  const { error, deleteRaffleZ, raffles: storedRaffles, setRaffles } = useRaffleStore();
  const [query, setQuery] = useState("");
  const [raffleToDelete, setRaffleToDelete] = useState<number | null>(null);

  useEffect(() => {
    if (raffles.length) window.localStorage.setItem("cogeme-un-numero-raffles", JSON.stringify(raffles));
  }, [raffles]);

  const columns = useMemo(() => [
    columnHelper.accessor("fechaRifa", { header: "Fecha de juego" }),
    columnHelper.accessor("loteria", { header: "Lotería" }),
    columnHelper.accessor("premio", { header: "Premio" }),
    columnHelper.accessor("precioNumero", { header: "Precio por número" }),
    columnHelper.display({ id: "actions", header: "Acciones", cell: ({ row }) => {
      const raffle = row.original;
      return <div className="flex items-center justify-end gap-1">
        <Link to={pathname} state={{ raffle }}><Button variant="ghost" size="icon" aria-label="Compartir rifa" onClick={() => navigator.clipboard.writeText(`${window.location.origin}/choose-number/${raffle.id}/${getUserId()}`).then(() => toast({ title: "Enlace copiado" }))}><Share2 data-icon="inline-start" /></Button></Link>
        <Link to={`/edit-raffle/${raffle.id}`} state={{ raffle }}><Button variant="ghost" size="icon" aria-label="Editar rifa"><Edit2 data-icon="inline-start" /></Button></Link>
        <Link to={`/my-raffle/${raffle.id}`} state={{ raffle }}><Button variant="ghost" size="icon" aria-label="Ver rifa"><Eye data-icon="inline-start" /></Button></Link>
        <AlertDialog><AlertDialogTrigger asChild><Button variant="ghost" size="icon" aria-label="Eliminar rifa" onClick={() => setRaffleToDelete(raffle.id)}><Trash2 data-icon="inline-start" /></Button></AlertDialogTrigger><AlertDialogContent><AlertDialogHeader><AlertDialogTitle>¿Eliminar esta rifa?</AlertDialogTitle><AlertDialogDescription>Esta acción no se puede deshacer.</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel>Cancelar</AlertDialogCancel><AlertDialogAction className="bg-destructive" onClick={async () => { if (raffleToDelete !== null) { const previous = [...storedRaffles]; await deleteRaffleZ(raffleToDelete); if (error) setRaffles(previous); else toast({ title: "Rifa eliminada" }); } }}>Eliminar</AlertDialogAction></AlertDialogFooter></AlertDialogContent></AlertDialog>
      </div>;
    } }),
  ], [pathname, raffleToDelete, storedRaffles, error, deleteRaffleZ, setRaffles, toast]);

  const table = useReactTable({ data: raffles, columns, state: { globalFilter: query }, onGlobalFilterChange: setQuery, getCoreRowModel: getCoreRowModel(), getFilteredRowModel: getFilteredRowModel() });
  const rows = table.getFilteredRowModel().rows;
  const totalValue = raffles.reduce((sum, raffle) => sum + Number(raffle.precioNumero || 0), 0);
  const exportCsv = () => { const header = ["Fecha de juego", "Lotería", "Premio", "Precio por número"]; const body = raffles.map((r) => [r.fechaRifa, r.loteria, r.premio, r.precioNumero]); const csv = [header, ...body].map((row) => row.map((value) => `"${String(value ?? "").replace(/"/g, '""')}"`).join(",")).join("\n"); const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" })); const anchor = document.createElement("a"); anchor.href = url; anchor.download = "mis-rifas.csv"; anchor.click(); URL.revokeObjectURL(url); toast({ title: "Exportación lista", description: "Se descargó tu archivo CSV." }); };

  if (!raffles.length) return <div className="rounded-xl border bg-card p-8 text-center shadow-sm"><div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-pink-100"><Ticket className="size-8 text-pink-600" /></div><h2 className="mb-2 text-xl font-semibold">No tienes rifas creadas</h2><p className="mb-6 text-muted-foreground">Comienza creando tu primera rifa.</p><Link to="/create-raffle" className="inline-flex items-center rounded-lg bg-pink-600 px-4 py-2 text-white hover:bg-pink-700"><PlusCircle data-icon="inline-start" /> Crear mi primera rifa</Link></div>;

  return <div className="flex flex-col gap-4">
    <div className="grid gap-3 sm:grid-cols-3"><div className="rounded-xl border bg-card p-4"><p className="text-xs uppercase tracking-wide text-muted-foreground">Rifas activas</p><p className="mt-1 text-2xl font-bold">{raffles.length}</p></div><div className="rounded-xl border bg-card p-4"><p className="text-xs uppercase tracking-wide text-muted-foreground">Premios publicados</p><p className="mt-1 text-2xl font-bold">{new Set(raffles.map((r) => r.premio)).size}</p></div><div className="rounded-xl border bg-card p-4"><p className="text-xs uppercase tracking-wide text-muted-foreground">Valor acumulado</p><p className="mt-1 text-2xl font-bold">${totalValue.toLocaleString("es-CO")}</p></div></div>
    <div className="flex flex-col justify-between gap-3 rounded-xl border bg-card p-3 sm:flex-row"><div className="relative max-w-sm flex-1"><Search className="absolute left-3 top-2.5 size-4 text-muted-foreground" /><Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar por premio, lotería o fecha..." className="pl-9" /></div><Button variant="outline" onClick={exportCsv}><Download data-icon="inline-start" /> Exportar CSV</Button></div>
    <div className="overflow-hidden rounded-xl border bg-card shadow-sm"><div className="overflow-x-auto"><table className="w-full min-w-[760px] text-sm"><thead className="border-b bg-muted/50"><tr>{table.getHeaderGroups()[0].headers.map((header) => <th key={header.id} className="h-12 px-4 text-left font-medium text-muted-foreground last:text-right">{flexRender(header.column.columnDef.header, header.getContext())}</th>)}</tr></thead><tbody>{rows.map((row) => <tr key={row.id} className="border-b transition-colors hover:bg-muted/40 last:border-0">{row.getVisibleCells().map((cell) => <td key={cell.id} className="p-4 align-middle last:text-right">{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>)}</tr>)}</tbody></table>{!rows.length && <p className="p-8 text-center text-muted-foreground">No encontramos rifas con esa búsqueda.</p>}</div></div>
  </div>;
};
export default RaffleCard;
export type { RaffleCardProps };
