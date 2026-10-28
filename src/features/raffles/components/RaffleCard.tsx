import {
  CalendarDays,
  CircleDollarSign,
  Gift,
  PlusCircle,
  Ticket,
} from "lucide-react";
import { Link } from "react-router-dom";
import RaffleActions from "./RaffleActions";

interface RaffleCardProps {
  raffles: Raffle[];
}

const RaffleCard: React.FC<RaffleCardProps> = ({ raffles }) => {
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

            <div className="flex items-center justify-end md:border-l md:pl-6">
              <RaffleActions raffle={raffle} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RaffleCard;
