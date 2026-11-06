import { Loader2 } from "lucide-react";
import { Bar } from "react-chartjs-2";
import EmptyState from "@/components/EmptyState";
import { chartColors } from "@/config/chartConfig";
import { useUserRafflesStats } from "../hooks";
import { formatMoney } from "../utils/stats";
import StatTile from "./StatTile";

const MAX_RAFFLES = 8;

const UserRafflesStats = () => {
  const { data: stats, isPending, isError } = useUserRafflesStats();

  if (isPending) {
    return (
      <div className="flex justify-center py-10">
        <Loader2 className="h-10 w-10 animate-spin text-pink-600" />
      </div>
    );
  }

  if (isError) {
    return (
      <p className="text-center text-sm text-gray-500">
        No se pudieron cargar las estadísticas.
      </p>
    );
  }

  if (stats.totalRifas === 0) {
    return (
      <EmptyState
        title="Aún no tienes rifas"
        text="Crea tu primera rifa para ver aquí cómo van tus ventas."
      />
    );
  }

  const topRaffles = stats.rifas
    .filter(({ recaudado }) => recaudado > 0)
    .sort((a, b) => b.recaudado - a.recaudado)
    .slice(0, MAX_RAFFLES);

  return (
    <section className="space-y-3">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <StatTile label="Rifas" value={stats.totalRifas} />

        <StatTile label="Números vendidos" value={stats.totalVendidos} />

        <StatTile
          label="Total recaudado"
          value={formatMoney(stats.totalRecaudado)}
        />
      </div>

      {topRaffles.length > 0 && (
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <h2 className="mb-2 text-sm font-medium text-gray-700">
            Recaudado por rifa
          </h2>

          <div
            className="relative"
            style={{ height: Math.max(topRaffles.length * 40 + 40, 120) }}
          >
            <Bar
              role="img"
              aria-label="Recaudado por rifa"
              fallbackContent={
                <ul>
                  {topRaffles.map(({ id, premio, recaudado }) => (
                    <li key={id}>
                      {premio}: {formatMoney(recaudado)}
                    </li>
                  ))}
                </ul>
              }
              data={{
                labels: topRaffles.map(({ premio }) => premio),
                datasets: [
                  {
                    label: "Recaudado",
                    data: topRaffles.map(({ recaudado }) => recaudado),
                    backgroundColor: chartColors.serie,
                    borderRadius: 4,
                    maxBarThickness: 20,
                  },
                ],
              }}
              options={{
                indexAxis: "y", // Barras horizontales: caben nombres largos
                maintainAspectRatio: false,
                plugins: {
                  legend: { display: false },
                  tooltip: {
                    callbacks: {
                      label: ({ parsed }) => formatMoney(parsed.x ?? 0),
                    },
                  },
                },
                scales: {
                  x: {
                    beginAtZero: true,
                    grid: { color: chartColors.grilla },
                    ticks: { callback: (value) => formatMoney(Number(value)) },
                  },
                  y: { grid: { display: false } },
                },
              }}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default UserRafflesStats;
