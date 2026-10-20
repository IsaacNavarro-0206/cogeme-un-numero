import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  nextPage: () => void;
  prevPage: () => void;
}

const PaginationControls = ({
  prevPage,
  nextPage,
  currentPage,
  totalPages,
}: PaginationControlsProps) => {
  return (
    <div className="flex justify-center gap-2 mt-4">
      <Button
        onClick={prevPage}
        disabled={currentPage === 1}
        className="px-4 py-2 mx-1 rounded-lg bg-pink-600 text-white/90 hover:bg-pink-700 transition-colors"
      >
        Anterior
      </Button>

      <Select
        value={`${currentPage}`}
        onValueChange={(value) => {
          if (Number(value) > currentPage) {
            nextPage();
          } else {
            prevPage();
          }
        }}
      >
        <SelectTrigger className="w-[60px] border border-gray-300 rounded-lg">
          <SelectValue placeholder={`${currentPage}`} />
        </SelectTrigger>

        <SelectContent>
          {Array.from({ length: totalPages }).map((_, index) => (
            <SelectItem key={index + 1} value={`${index + 1}`}>
              {index + 1}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button
        onClick={nextPage}
        disabled={currentPage === totalPages}
        className="px-4 py-2 mx-1 rounded-lg bg-pink-600 text-white/90 hover:bg-pink-700 transition-colors"
      >
        Siguiente
      </Button>
    </div>
  );
};

export default PaginationControls;
