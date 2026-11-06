interface StatTileProps {
  label: string;
  value: string | number;
}

const StatTile = ({ label, value }: StatTileProps) => (
  <div className="rounded-xl border border-gray-200 bg-white p-4">
    <p className="text-sm text-gray-500">{label}</p>

    <p className="mt-1 text-2xl font-bold text-gray-900">{value}</p>
  </div>
);

export default StatTile;
