import { PackageOpen } from "lucide-react";
import React from "react";

interface EmptyMessageProps {
  text: string;
  Icon?: React.ComponentType<{ className?: string }>; // Icono opcional
  textSize?: "sm" | "base" | "lg" | "xl" | "2xl";
}

const EmptyMessage: React.FC<EmptyMessageProps> = ({
  text,
  Icon = PackageOpen,
  textSize = "lg", // Tamaño por defecto
}) => {
  return (
    <div className="flex items-center justify-center w-full h-full p-10 gap-4 rounded-md">
      <Icon className="w-6 h-6" />
      <h1 className={`text-center font-semibold text-black text-${textSize}`}>
        {text}
      </h1>
    </div>
  );
};

export default EmptyMessage;
