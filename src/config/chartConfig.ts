import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from "chart.js";

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
);

ChartJS.defaults.font.family = '"Inter Variable", sans-serif';
ChartJS.defaults.color = "#52514e";

export const chartColors = {
  serie: "#db2777",
  serieSuave: "rgba(219, 39, 119, 0.1)",
  grilla: "#e5e7eb",
  superficie: "#ffffff",
  aceptado: "#0ca30c",
  pendiente: "#fab219",
  rechazado: "#d03b3b",
};
