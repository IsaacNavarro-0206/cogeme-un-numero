import { Hash } from "lucide-react";

interface EmptyStateProps {
  title: string;
  text: string;
}

const EmptyState = ({ title, text }: EmptyStateProps) => (
  <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
      <Hash className="w-6 h-6 text-gray-400" />
    </div>

    <h3 className="text-lg font-medium text-gray-900">{title}</h3>

    <p className="mt-2 text-sm text-gray-500">{text}</p>
  </div>
);

export default EmptyState;
