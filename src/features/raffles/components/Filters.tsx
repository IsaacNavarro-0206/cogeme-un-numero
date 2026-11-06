import { Input } from "@/components/ui/input";
import type { RaffleFilters } from "../services/raffle";

export interface FiltersProps {
  filters: RaffleFilters;
  onChange: (filters: RaffleFilters) => void;
}

const Filters = ({ filters, onChange }: FiltersProps) => {
  return (
    <div className="mb-5 grid grid-cols-1 gap-3 md:grid-cols-3">
      <div>
        <label
          htmlFor="raffle-lottery"
          className="mb-1 block text-sm font-medium"
        >
          Buscar por lotería
        </label>
        <Input
          id="raffle-lottery"
          placeholder="Nombre de la lotería"
          value={filters.loteria}
          onChange={(event) =>
            onChange({ ...filters, loteria: event.target.value })
          }
        />
      </div>

      <div>
        <label
          htmlFor="raffle-date-from"
          className="mb-1 block text-sm font-medium"
        >
          Desde
        </label>
        <Input
          id="raffle-date-from"
          type="date"
          value={filters.fechaDesde}
          max={filters.fechaHasta || undefined}
          onChange={(event) =>
            onChange({ ...filters, fechaDesde: event.target.value })
          }
        />
      </div>

      <div>
        <label
          htmlFor="raffle-date-to"
          className="mb-1 block text-sm font-medium"
        >
          Hasta
        </label>
        <Input
          id="raffle-date-to"
          type="date"
          value={filters.fechaHasta}
          min={filters.fechaDesde || undefined}
          onChange={(event) =>
            onChange({ ...filters, fechaHasta: event.target.value })
          }
        />
      </div>
    </div>
  );
};

export default Filters;
