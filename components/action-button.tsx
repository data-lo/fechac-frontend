'use client'
import React from "react";
import { Button } from "@/components/ui/button";
import { Loader2, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { icons, IconName } from "./icon";

type ButtonType = "submit" | "button" | "reset";
type ButtonVariant =
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | null
    | undefined;

type ButtonSize = "sm" | "md" | "lg" | "xl" | "full" | "auto";
type ButtonJustify = "center" | "start" | "end";
type ButtonIconPosition = "left" | "right" | "only";

interface Props extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick' | 'type'> {
    // Estado y loading
    isLoading?: boolean;
    isPending?: boolean; // Deprecated
    disabled?: boolean;
    
    // Contenido
    children?: React.ReactNode;
    title?: string; // Deprecated
    iconName?: IconName;
    iconPosition?: ButtonIconPosition;
    loadingText?: string;
    
    // Eventos
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void | Promise<void>;
    
    // Tipos
    type?: ButtonType;
    variant?: ButtonVariant;
    
    // Estilos
    size?: ButtonSize;
    justify?: ButtonJustify;
    rounded?: string;
    fullWidth?: boolean;
    
    // Clases personalizadas
    className?: string;
    iconClassName?: string;
    
    // Accesibilidad
    ariaLabel?: string;
    ariaDescribedBy?: string;
}

const sizeMap: Record<ButtonSize, string> = {
    sm: "h-8 text-xs px-3",
    md: "h-10 text-sm px-4",
    lg: "h-12 text-base px-5",
    xl: "h-14 text-lg px-6",
    full: "w-full h-10 text-sm",
    auto: "w-auto h-10 text-sm px-4"
};

const justifyMap: Record<ButtonJustify, string> = {
    center: "justify-center",
    start: "justify-start",
    end: "justify-end"
};

const ActionButton = React.forwardRef<HTMLButtonElement, Props>(
    (
        {
            isLoading = false,
            isPending = false,
            disabled = false,
            children,
            title,
            iconName,
            iconPosition = "left",
            loadingText,
            onClick,
            type = "button",
            variant = "default",
            size = "md",
            justify = "center",
            rounded = "rounded-md",
            fullWidth = false,
            className = "",
            iconClassName = "",
            ariaLabel,
            ariaDescribedBy,
            ...restProps
        },
        ref
    ) => {


        const Icon = iconName ? icons[iconName] : undefined;

        const loading = isLoading || isPending;
        const buttonContent = children || title;
        const isIconOnly = iconPosition === "only" || (!buttonContent && Icon);

        const baseClasses = cn(
            "inline-flex items-center gap-2 transition-all duration-200",
            justifyMap[justify],
            fullWidth ? "w-full" : sizeMap[size],
            rounded,
            {
                "gap-0": isIconOnly,
                "px-3": isIconOnly && size === "auto",
                "whitespace-nowrap": !fullWidth, // Mantener en una sola línea si no es full
            },
            className
        );

        const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
            if (!onClick || loading || disabled) return;
            try {
                const result = onClick(event);
                if (result instanceof Promise) {
                    await result;
                }
            } catch (error) {
                console.error('Button onClick error:', error);
            }
        };

        const renderIcon = () => {
            if (loading) {
                return <Loader2 className={cn("h-4 w-4 animate-spin", iconClassName)} />;
            }
            if (Icon) {
                return <Icon className={cn("h-4 w-4 flex-shrink-0", iconClassName)} />;
            }
            return null;
        };

        const renderContent = () => {
            if (isIconOnly) return null;
            const content = loading && loadingText ? loadingText : buttonContent;
            return content && (
                <span
                    className={cn(
                        "font-medium leading-tight",
                        loading && "opacity-75",
                        "max-w-full break-words" // Adaptable al texto
                    )}
                >
                    {content}
                </span>
            );
        };

        return (
            <Button
                ref={ref}
                onClick={handleClick}
                type={type}
                variant={variant}
                className={baseClasses}
                disabled={loading || disabled}
                aria-label={ariaLabel || (isIconOnly ? buttonContent?.toString() : undefined)}
                aria-describedby={ariaDescribedBy}
                {...restProps}
            >
                {iconPosition === "left" && renderIcon()}
                {renderContent()}
                {iconPosition === "right" && renderIcon()}
                {iconPosition === "only" && renderIcon()}
            </Button>
        );
    }
);

ActionButton.displayName = "NewButton";

export default ActionButton;
