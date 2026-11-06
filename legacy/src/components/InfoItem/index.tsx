interface InfoItemProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  bgColor: string;
}

const InfoItem = ({ icon, label, value, bgColor }: InfoItemProps) => (
  <div className="flex items-center gap-2">
    <div
      className={`${bgColor} w-8 h-8 rounded-full flex items-center justify-center`}
    >
      {icon}
    </div>

    <div className="flex flex-col">
      <h3 className="text-sm text-gray-500">{label}</h3>

      <p className="font-semibold">{value}</p>
    </div>
  </div>
);

export default InfoItem;
