import React from "react";
import { Button } from "@/components/ui/button";
import { Loader2, LucideIcon } from "lucide-react";

type typeRequest = "submit" | "button" | "reset";
type variant =
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | null
    | undefined;

type typeJustify = "justify-center" | "justify-start"

interface Props {
    isPending?: boolean; // Si ejecuta una mutación se bloquear el boton
    disabled?: boolean; // Si se desactiva por una condición
    title?: string; // Opcional
    onClick?: (values: any) => void;
    icon?: LucideIcon;
    type?: typeRequest;
    typeJustify?: typeJustify
    variant?: variant;
    sizeButton?: string;
    rounded?: string;
    defaultColor?: boolean;
}

// Componente con forwardRef
const ButtonComponent = React.forwardRef<HTMLButtonElement, Props>(
    (
        {
            isPending = false,
            disabled = false,
            title,
            onClick,
            icon: Icon,
            variant = "default",
            type = "submit",
            sizeButton = "w-[338px]",
            rounded = "rounded-md",
            typeJustify = "justify-center",
            defaultColor = false
        },
        ref // Pasar la ref al nodo interno
    ) => {

        return (
            <Button
                ref={ref}
                onClick={onClick}
                type={type}
                variant={variant}
                className={`flex items-center ${typeJustify} ${sizeButton} ${rounded}`}
                disabled={isPending || disabled}
            >
                {isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                    Icon && <Icon className="h-4 w-4" />
                )}
                {title && <span className="text-sm font-medium">{title}</span>}
            </Button>
        );
    }
);

ButtonComponent.displayName = "ButtonComponent"; // Necesario para evitar errores en dev tools con forwardRef

export default ButtonComponent;
