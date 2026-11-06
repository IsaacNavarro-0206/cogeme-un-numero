/**
 * Componente que muestra la lista de números aceptados para una rifa
 * 
 * Características:
 * - Filtrado automático de números aceptados
 * - Paginación de resultados
 * - Visualización detallada de cada número aceptado
 * - Estado vacío personalizado
 */

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { usePagination } from "@/hooks/usePagination";
import PaginationControls from "../PaginationControls";
import { GetChoosenNumbers } from "@/service/choosenNumber";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import EmptyState from "../EmptyState";
import AcceptedNumberItem from "../AcceptedNumberItem";
import { useParams } from "react-router-dom";

const AcceptedNumberCard = () => {
  // Estado para almacenar solo los números con estado "aceptado"
  const [filteredAcceptedNumbers, setFilteredAcceptedNumbers] = useState<RequestNumber[]>([]);
  const { toast } = useToast();

  const { id } = useParams();

  /**
   * Efecto para cargar y filtrar los números aceptados
   * Se ejecuta al montar el componente o cuando cambia el ID de la rifa
   */
  useEffect(() => {
    const getChoosenNumbers = async () => {
      try {
        const { data } = await GetChoosenNumbers(id);

        const filteredNumbersByStatusAccepted = data.filter(
          (acceptedNumber: RequestNumber) =>
            acceptedNumber.estado === "aceptado"
        );

        setFilteredAcceptedNumbers(filteredNumbersByStatusAccepted);
      } catch (error) {
        console.log(error);
        toast({
          title: "Error",
          description: "Hubo un problema al obtener los números aceptados.",
          variant: "destructive",
        });
      }
    };

    getChoosenNumbers();
  }, [id, toast]);

  // Configuración de paginación para los números aceptados
  const { currentItems, currentPage, totalPages, nextPage, prevPage } =
    usePagination({
      data: filteredAcceptedNumbers,
      itemsPerPage: 5,
    });

  return (
    <Card className="my-5 w-full pb-2.5">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Números aceptados</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4 custom-scrollbar overflow-y-auto max-h-screen lg:max-h-[350px]">
        {currentItems.length > 0 ? (
          currentItems.map((acceptedNumber) => (
            <AcceptedNumberItem
              key={acceptedNumber.id}
              acceptedNumber={acceptedNumber}
            />
          ))
        ) : (
          <EmptyState
            title="No hay números aceptados"
            text="Aquí aparecerán los números que sean aceptados"
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

export default AcceptedNumberCard;
