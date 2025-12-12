'use client'
import { AlertTriangle, RefreshCw, X } from "lucide-react";
import { useState } from "react";
import ActionButton from "./action-button";

interface Props {
    buttonText: string;
    message: string | null;
    variant?: 'error' | 'warning';
    showActions?: boolean;
    onRetry?: () => void;
    onClick?: () => void
    dismissible?: boolean;
    onDismiss?: () => void;
    className?: string;
}

const AlertMessage = ({
    buttonText,
    message,
    onClick,
    variant = 'error',
    showActions = true,
    onRetry,
    dismissible = false,
    onDismiss,
    className = ""
}: Props) => {
    const [isDismissed, setIsDismissed] = useState(false);

    const handleDismiss = () => {
        setIsDismissed(true);
        onDismiss?.();
    };

    const handleRetry = () => {
        onRetry?.();
    };

    const handleAction = () => {
        onClick?.();
    };

    if (isDismissed) return null;

    const variants = {
    error: {
        bg: "bg-red-100",     // ← sólido, sin gradiente
        border: "border-red-200",
        text: "text-red-900",
        icon: "text-red-500",
        button: "bg-red-600 hover:bg-red-700 text-white",
        buttonOutline: "border-red-300 text-red-700 hover:bg-red-50"
    },
    warning: {
        bg: "bg-amber-50",   // ← sólido, sin gradiente
        border: "border-amber-200",
        text: "text-amber-900",
        icon: "text-amber-500",
        button: "bg-amber-600 hover:bg-amber-700 text-white",
        buttonOutline: "border-amber-300 text-amber-700 hover:bg-amber-50"
    }
};


    const currentVariant = variants[variant];

    return (
        <div
            className={`
                ${currentVariant.bg} ${currentVariant.text}
                relative border-none rounded-sm px-6 py-5 
                backdrop-blur-sm transition-all
                animate-in slide-in-from-top-2
                ${className}
            `}
            role="alert"
        >
            {/* Dismiss button */}
            {dismissible && (
                <button
                    onClick={handleDismiss}
                    className={`
                        absolute top-3 right-3 p-1 rounded-full
                        ${currentVariant.text} hover:bg-white/20 
                        transition-colors duration-200
                    `}
                    aria-label="Dismiss alert"
                >
                    <X className="h-4 w-4" />
                </button>
            )}

            <div className="flex items-center gap-6 w-full">
                {/* Icon */}
                <div className="flex-shrink-0">
                    <AlertTriangle
                        className={`
                            h-6 w-6 ${currentVariant.icon} 
                            animate-pulse
                        `}
                    />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    {message && (
                        <div className="leading-tight">
                            {message}
                        </div>
                    )}

                    {/* <p className="text-sm opacity-80 leading-relaxed mt-1">
                        Intenta recargar la página. Si el problema continúa, por favor, contacta al soporte técnico.
                    </p> */}
                </div>

                {/* Action buttons */}
                {showActions && (
                    <div className="flex gap-3 items-center flex-shrink-0">
                        {onRetry && (
                            <button
                                onClick={handleRetry}
                                className={`
                                    inline-flex items-center gap-2 px-4 py-2
                                    ${currentVariant.button}
                                    rounded-lg font-medium text-sm
                                    transition-all duration-200
                                    hover:scale-105 active:scale-95
                                `}
                            >
                                <RefreshCw className="h-4 w-4" />
                                Reintentar
                            </button>
                        )}

                        <ActionButton
                            title={buttonText}
                            type="button"
                            variant="default"   
                            fullWidth={true}
                            onClick={handleAction}
                        />
                    </div>
                )}
            </div>

        </div>
    );
};

export default AlertMessage;