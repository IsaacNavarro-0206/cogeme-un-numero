import { CheckCircle2, Clock, Loader2, XCircle } from "lucide-react";
import { Doughnut, Line } from "react-chartjs-2";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { chartColors } from "@/config/chartConfig";
import { useRaffleStats } from "../hooks";
import { fillMissingDays, formatMoney } from "../utils/stats";
import StatTile from "./StatTile";

const STATES = [
  {
    key: "aceptado",
    label: "Aceptados",
    color: chartColors.aceptado,
    Icon: CheckCircle2,
  },
  {
    key: "pendiente",
    label: "Pendientes",
    color: chartColors.pendiente,
    Icon: Clock,
  },
  {
    key: "rechazado",
    label: "Rechazados",
    color: chartColors.rechazado,
    Icon: XCircle,
  },
] as const;

const RaffleStatsCard = () => {
  const { id } = useParams();
  const { data: stats, isPending, isError } = useRaffleStats(id);

  if (isPending) {
    return (
      <div className="flex justify-center py-10">
        <Loader2 className="h-10 w-10 animate-spin text-pink-600" />
      </div>
    );
  }

  if (isError) {
    return (
      <p className="py-6 text-center text-sm text-gray-500">
        No se pudieron cargar las estadísticas de esta rifa.
      </p>
    );
  }

  const days = fillMissingDays(stats.porDia);
  const hasNumbers = STATES.some(({ key }) => stats.porEstado[key] > 0);
  const stateSummary = STATES.map(
    ({ key, label }) => `${label}: ${stats.porEstado[key]}`,
  ).join(", ");

  return (
    <Card className="my-5 w-full pb-2.5">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Estadísticas</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <StatTile label="Recaudado" value={formatMoney(stats.recaudado)} />

          <StatTile label="Vendido" value={`${stats.porcentajeVendido}%`} />

          <StatTile label="Disponibles" value={stats.disponibles} />
        </div>

        {hasNumbers ? (
          <>
            <div className="grid grid-cols-1 items-center gap-6 sm:grid-cols-2">
              {/* Chart.js toma el tamaño del contenedor, por eso necesita alto fijo */}
              <div className="relative mx-auto h-48 w-48">
                <Doughnut
                  role="img"
                  aria-label={`Números por estado. ${stateSummary}`}
                  fallbackContent={<p>{stateSummary}</p>}
                  data={{
                    labels: STATES.map(({ label }) => label),
                    datasets: [
                      {
                        data: STATES.map(({ key }) => stats.porEstado[key]),
                        backgroundColor: STATES.map(({ color }) => color),
                        borderColor: chartColors.superficie,
                        borderWidth: 2,
                      },
                    ],
                  }}
                  options={{
                    maintainAspectRatio: false,
                    cutout: "68%",
                    // La leyenda es HTML para mostrar icono, nombre y cantidad
                    plugins: { legend: { display: false } },
                  }}
                />
              </div>

              <ul className="space-y-3">
                {STATES.map(({ key, label, color, Icon }) => (
                  <li key={key} className="flex items-center gap-2 text-sm">
                    <Icon className="h-4 w-4" style={{ color }} />

                    <span className="text-gray-600">{label}</span>

                    <strong className="ml-auto text-gray-900">
                      {stats.porEstado[key]}
                    </strong>
                  </li>
                ))}
              </ul>
            </div>

            {days.length > 0 && (
              <div>
                <h3 className="mb-2 text-sm font-medium text-gray-700">
                  Números escogidos por día
                </h3>

                <div className="relative h-56">
                  <Line
                    role="img"
                    aria-label="Números escogidos por día"
                    fallbackContent={
                      <ul>
                        {days.map(({ fecha, total }) => (
                          <li key={fecha}>
                            {fecha}: {total}
                          </li>
                        ))}
                      </ul>
                    }
                    data={{
                      labels: days.map(({ fecha }) => fecha),
                      datasets: [
                        {
                          label: "Números",
                          data: days.map(({ total }) => total),
                          borderColor: chartColors.serie,
                          backgroundColor: chartColors.serieSuave,
                          borderWidth: 2,
                          fill: true,
                          pointRadius: 4,
                          pointHoverRadius: 6,
                          pointBackgroundColor: chartColors.serie,
                          pointBorderColor: chartColors.superficie,
                          pointBorderWidth: 2,
                        },
                      ],
                    }}
                    options={{
                      maintainAspectRatio: false,
                      // El tooltip aparece al pasar cerca, sin atinarle al punto
                      interaction: { mode: "index", intersect: false },
                      plugins: { legend: { display: false } },
                      scales: {
                        x: { grid: { display: false } },
                        y: {
                          beginAtZero: true,
                          ticks: { precision: 0 },
                          grid: { color: chartColors.grilla },
                        },
                      },
                    }}
                  />
                </div>
              </div>
            )}
          </>
        ) : (
          <p className="py-6 text-center text-sm text-gray-500">
            Cuando alguien escoja un número, aquí verás cómo va la rifa.
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default RaffleStatsCard;
