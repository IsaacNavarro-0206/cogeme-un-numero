const DAY_IN_MS = 24 * 60 * 60 * 1000;

export const formatMoney = (value: number) =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(value);

/**
 * La API solo devuelve los días con ventas. Se completan los días sin ventas
 * para que el eje del tiempo no junte fechas que no son consecutivas.
 */
export const fillMissingDays = (
  days: { fecha: string; total: number }[],
): { fecha: string; total: number }[] => {
  if (days.length < 2) return days;

  const totals = new Map(days.map(({ fecha, total }) => [fecha, total]));
  const start = Date.parse(`${days[0].fecha}T00:00:00Z`);
  const end = Date.parse(`${days[days.length - 1].fecha}T00:00:00Z`);
  const filled: { fecha: string; total: number }[] = [];

  for (let time = start; time <= end; time += DAY_IN_MS) {
    const fecha = new Date(time).toISOString().slice(0, 10);
    filled.push({ fecha, total: totals.get(fecha) ?? 0 });
  }

  return filled;
};
