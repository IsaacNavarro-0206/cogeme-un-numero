import PaginationControls from "@/components/PaginationControls";
import RaffleCard from "./RaffleCard";
import { usePagination } from "@/hooks/usePagination";
import { useRaffles } from "../hooks";
import { Loader2, Ticket } from "lucide-react";
import { Link } from "react-router-dom";

const MyRaffles = () => {
  const { data, isPending } = useRaffles();
  const raffles = (data?.data as Raffle[]) || [];

  const { currentItems, currentPage, totalPages, nextPage, prevPage } =
    usePagination({
      data: raffles,
      itemsPerPage: 5,
    });

  return (
    <div className="mb-5 max-w-5xl w-11/12">
      <div className="flex justify-between items-center mb-5 mt-5">
        <h1 className="text-2xl md:text-3xl font-bold">Mis rifas</h1>

        <Link
          to="/create-raffle"
          className="inline-flex items-center px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
        >
          <Ticket className="w-4 h-4 mr-2" />
          Nueva rifa
        </Link>
      </div>

      <div className="custom-scrollbar overflow-y-auto max-h-screen lg:max-h-[520px] p-3">
        {isPending ? (
          <div className="flex justify-center items-center h-[400px]">
            <Loader2 className="h-[200px] w-[200px] animate-spin text-pink-600" />
          </div>
        ) : (
          <RaffleCard raffles={currentItems} />
        )}
      </div>

      {/* Controles de paginación */}
      <PaginationControls
        prevPage={prevPage}
        currentPage={currentPage}
        nextPage={nextPage}
        totalPages={totalPages}
      />
    </div>
  );
};

export default MyRaffles;
