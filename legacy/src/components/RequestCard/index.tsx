/**
 * Componente que muestra y gestiona las solicitudes pendientes de números para una rifa
 * 
 * Características:
 * - Carga automática de solicitudes pendientes
 * - Paginación de resultados
 * - Manejo de estados de aceptación/rechazo
 * - Interfaz de usuario para estados vacíos
 */

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { usePagination } from "@/hooks/usePagination";
import PaginationControls from "../PaginationControls";
import {
  GetChoosenNumbers,
  UpdateStatusChoosenNumber,
} from "@/service/choosenNumber";
import { useToast } from "@/hooks/use-toast";
import { useState, useCallback, useEffect } from "react";
import RequestItem from "../RequestItem";
import EmptyState from "../EmptyState";
import { useParams } from "react-router-dom";

const RequestCard = () => {
  // Estado para almacenar las solicitudes pendientes
  const [requests, setRequests] = useState<RequestNumber[]>([]);

  const { toast } = useToast();

  const { id } = useParams();

  /**
   * Efecto para cargar las solicitudes pendientes cuando el componente se monta
   * o cuando cambia el ID de la rifa
   */
  useEffect(() => {
    const getChoosenNumbers = async () => {
      try {
        const { data } = await GetChoosenNumbers(id);

        const filteredNumbersByStatusPending = data.filter(
          (requestedNumber: RequestNumber) =>
            requestedNumber.estado === "pendiente"
        );

        setRequests(filteredNumbersByStatusPending);
      } catch (error) {
        console.log(error);
        toast({
          title: "Error",
          description: "Hubo un problema al obtener los números solicitados.",
          variant: "destructive",
        });
      }
    };

    getChoosenNumbers();
  }, [id, toast]);

  const { currentItems, currentPage, totalPages, nextPage, prevPage } =
    usePagination({
      data: requests,
      itemsPerPage: 5,
    });

  /**
   * Maneja la aceptación o rechazo de una solicitud de número
   * @param id - ID de la solicitud
   * @param status - Nuevo estado ('aceptado' o 'rechazado')
   */
  const handleRejectOrAcceptNumber = useCallback(
    async (id: number, status: string) => {
      try {
        await UpdateStatusChoosenNumber({ estado: status }, id);
        setRequests((prev) => prev.filter((request) => request.id !== id));

        toast({
          title: `Solicitud ${
            status === "aceptado" ? "aceptada" : "rechazada"
          }`,
          description: `El número ha sido ${
            status === "aceptado" ? "aceptado" : "rechazado"
          }.`,
        });
      } catch (error) {
        console.error(error);
        toast({
          title: "Error",
          description: "Hubo un problema al procesar la solicitud.",
          variant: "destructive",
        });
      }
    },
    [toast]
  );

  return (
    <Card className="my-5 w-full pb-2.5">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          Solicitudes de números
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4 custom-scrollbar overflow-y-auto max-h-screen lg:max-h-[350px]">
        {currentItems.length > 0 ? (
          currentItems.map((request) => (
            <RequestItem
              key={request.id}
              request={request}
              onStatusUpdate={handleRejectOrAcceptNumber}
            />
          ))
        ) : (
          <EmptyState
            title="No hay solicitudes pendientes"
            text="Las nuevas solicitudes aparecerán aquí"
          />
        )}
      </CardContent>

      {currentItems.length > 0 && (
        <PaginationControls
          prevPage={prevPage}
          currentPage={currentPage}
          nextPage={nextPage}
          totalPages={totalPages}
        />
      )}
    </Card>
  );
};

export default RequestCard;
