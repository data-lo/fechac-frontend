import { PackageOpen } from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";

interface EmptyMessageProps {
  text: string;
  Icon?: React.ComponentType<{ className?: string }>;
  textSize?: "sm" | "base" | "lg" | "xl" | "2xl";
  className?: string;
}

const textSizeMap: Record<NonNullable<EmptyMessageProps["textSize"]>, string> = {
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
};

const EmptyState: React.FC<EmptyMessageProps> = ({
  text,
  Icon = PackageOpen,
  textSize = "base",
  className,
}) => {
  return (
    <div
      role="status"
      className={cn(
        "flex items-center justify-center w-full h-full p-8 gap-2 rounded-md text-center mt-16",
        className
      )}
    >
      <Icon className={cn("w-6 h-6")} />
      <p
        className={cn(
          "font-medium text-gray",
          textSizeMap[textSize]
        )}
      >
        {text}
      </p>
    </div>
  );
};

export default EmptyState;
