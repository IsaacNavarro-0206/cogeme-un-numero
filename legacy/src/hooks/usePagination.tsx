import { useState } from "react";

interface UsePaginationProps<T> {
  data: T[];
  itemsPerPage?: number;
  initialPage?: number;
}

interface UsePaginationReturn<T> {
  currentItems: T[];
  currentPage: number;
  totalPages: number;
  nextPage: () => void;
  prevPage: () => void;
}

/**
 * Hook personalizado para manejar la paginación de cualquier tipo de datos
 * @template T - Tipo genérico para los datos a paginar
 */
export const usePagination = <T,>({
  data,
  itemsPerPage = 5,
  initialPage = 1,
}: UsePaginationProps<T>): UsePaginationReturn<T> => {
  // Controla el número de página actual
  const [currentPage, setCurrentPage] = useState(initialPage);

  // Asegurar que es un arreglo
  const safeData = Array.isArray(data) ? data : [];

  // Calcula los índices para la paginación
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Obtiene los elementos de la página actual
  const currentItems = safeData.slice(indexOfFirstItem, indexOfLastItem);

  // Calcula el número total de páginas
  const totalPages = Math.ceil(data.length / itemsPerPage);

  /**
   * Cambia a la página especificada si está dentro del rango válido
   * @param pageNumber - Número de página al que se desea navegar
   */
  const paginate = (pageNumber: number) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  /** Navega a la siguiente página si está disponible */
  const nextPage = () => paginate(currentPage + 1);

  /** Navega a la página anterior si está disponible */
  const prevPage = () => paginate(currentPage - 1);

  return {
    currentItems, // Elementos de la página actual
    currentPage, // Número de página actual
    totalPages, // Total de páginas
    nextPage, // Función para ir a la siguiente página
    prevPage, // Función para ir a la página anterior
  };
};
