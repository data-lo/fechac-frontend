"use client"

// React
import React from "react";

// External libraries / icons
import { Loader2 } from "lucide-react";

// Utilities
import { cn } from "@/lib/utils";
import { icon, allowedIcons } from "@/lib/icons";

// UI components
import { Button } from "@/components/ui/button";


type ButtonIconPosition = "left" | "right" | "only"
type ButtonWidth = "auto" | "full" | "sm" | "md" | "lg" | "min"

type Props = React.ComponentProps<typeof Button> & {
  isLoading?: boolean
  loadingText?: string
  width?: ButtonWidth

  icon?: icon
  iconPosition?: ButtonIconPosition
}

const widthClassMap: Record<ButtonWidth, string> = {
  auto: "w-auto",
  full: "w-full",
  sm: "w-24",
  md: "w-32",
  lg: "w-40",
  min: "w-min"
}

const CommandButton = React.forwardRef<HTMLButtonElement, Props>(
  (
    {
      isLoading = false,
      width = "full",
      loadingText,
      icon,
      iconPosition = "left",
      disabled,
      children,
      className,
      variant = "default",
      type = "submit",
      ...props
    },
    ref
  ) => {
    const Icon = icon ? allowedIcons[icon] : undefined;

    const isIconOnly = iconPosition === "only" && !children;

    return (
      <Button
        ref={ref}
        type={type}
        variant={variant}
        disabled={isLoading || disabled}
        className={cn(
          "inline-flex items-center gap-2 transition-all duration-200",
          isIconOnly && "px-3",
          widthClassMap[width],          className
        )}
        {...props}
      >
        {/* Icon left */}
        {iconPosition === "left" && (
          isLoading
            ? <Loader2 className="h-4 w-4 animate-spin" />
            : Icon && <Icon className="h-4 w-4" />
        )}

        {/* Content */}
        {!isIconOnly && (
          <span className={cn("font-medium", isLoading && "opacity-70")}>
            {isLoading && loadingText ? loadingText : children}
          </span>
        )}

        {/* Icon right */}
        {iconPosition === "right" && (
          isLoading
            ? <Loader2 className="h-4 w-4 animate-spin" />
            : Icon && <Icon className="h-4 w-4" />
        )}

        {/* Icon only */}
        {iconPosition === "only" && (
          isLoading
            ? <Loader2 className="h-4 w-4 animate-spin" />
            : Icon && <Icon className="h-4 w-4" />
        )}
      </Button>
    )
  }
)

CommandButton.displayName = "CommandButton"

export default CommandButton