import { Calendar, CircleDollarSign, Gift, Ticket, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useLocation } from "react-router-dom";

interface RaffleInfoCardProps {
  raffle?: Raffle;
  userName?: string;
}

const RaffleInfoCard: React.FC<RaffleInfoCardProps> = ({
  raffle: propRaffle,
  userName,
}) => {
  const { state } = useLocation();
  // Se intenta obtener la rifa del state si no se pasa por props.
  const raffle = propRaffle || state?.raffle;

  return (
    <div className="max-w-2xl space-y-6 w-11/12">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Información de la rifa
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-2">
          {userName && (
            <div className="flex items-center gap-2 text-gray-600">
              <User className="w-5 h-5" />

              <span className="text-sm">
                <strong>Responsable:</strong> {userName}
              </span>
            </div>
          )}

          <div className="flex items-center gap-2 text-gray-600">
            <Calendar className="w-5 h-5" />

            <span className="text-sm">
              <strong>Fecha de juego:</strong> {raffle?.fechaRifa}
            </span>
          </div>

          <div className="flex items-center gap-2 text-gray-600">
            <Ticket className="w-5 h-5" />

            <span className="text-sm">
              <strong>Lotería:</strong> {raffle?.loteria}
            </span>
          </div>

          <div className="flex items-center gap-2 text-gray-600">
            <Gift className="w-5 h-5" />

            <span className="text-sm">
              <strong>Premio:</strong> {raffle?.premio}
            </span>
          </div>

          <div className="flex items-center gap-2 text-gray-600">
            <CircleDollarSign className="w-5 h-5" />

            <span className="text-sm">
              <strong>Precio por número:</strong> {raffle?.precioNumero}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RaffleInfoCard;
