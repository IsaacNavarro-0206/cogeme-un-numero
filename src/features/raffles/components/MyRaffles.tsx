import { useEffect, useState } from "react";
import type { PaginationState } from "@tanstack/react-table";
import PaginationControls from "@/components/PaginationControls";
import RaffleCard from "./RaffleCard";
import RaffleTable from "./RaffleTable";
import { useRaffles } from "../hooks";
import { Loader2, Ticket } from "lucide-react";
import { Link } from "react-router-dom";

const MyRaffles = () => {
  // Estado compartido por la tabla (desktop) y las tarjetas (mobile)
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });

  const { data, isPending } = useRaffles(pagination);
  const raffles = data?.data ?? [];
  const total = data?.total ?? 0;
  const totalPages = Math.max(Math.ceil(total / pagination.pageSize), 1);

  // Si se elimina la última rifa de una página, retrocede a la anterior
  useEffect(() => {
    if (data && raffles.length === 0 && pagination.pageIndex > 0) {
      setPagination((prev) => ({ ...prev, pageIndex: prev.pageIndex - 1 }));
    }
  }, [data, raffles.length, pagination.pageIndex]);

  const goToPage = (pageIndex: number) =>
    setPagination((prev) => ({ ...prev, pageIndex }));

  return (
    <div className="mb-5 max-w-5xl w-11/12">
      <div className="flex justify-between items-center mb-5 mt-5">
        <h1 className="text-2xl md:text-3xl font-bold">Mis rifas</h1>

        <Link
          to="/create-raffle"
          className="inline-flex items-center px-4 py-2 bg-pink-600 text-white rounded-full hover:bg-pink-700 transition-colors"
        >
          <Ticket className="w-4 h-4 mr-2" />
          Nueva rifa
        </Link>
      </div>

      {isPending ? (
        <div className="flex justify-center items-center h-[400px]">
          <Loader2 className="h-[200px] w-[200px] animate-spin text-pink-600" />
        </div>
      ) : total === 0 ? (
        <RaffleCard raffles={[]} />
      ) : (
        <>
          {/* Desktop: tabla con paginación del servidor */}
          <div className="hidden lg:block">
            <RaffleTable
              raffles={raffles}
              rowCount={total}
              pagination={pagination}
              onPaginationChange={setPagination}
            />
          </div>

          {/* Mobile: tarjetas */}
          <div className="lg:hidden">
            <div className="custom-scrollbar overflow-y-auto max-h-screen p-3">
              <RaffleCard raffles={raffles} />
            </div>

            <PaginationControls
              currentPage={pagination.pageIndex + 1}
              totalPages={totalPages}
              prevPage={() => goToPage(pagination.pageIndex - 1)}
              nextPage={() => goToPage(pagination.pageIndex + 1)}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default MyRaffles;
