'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ReactNode } from "react"
import ActionButton from "./action-button"
import { IconName } from "./icon"
import { cn } from "@/lib/utils" // Utilidad para combinar clases de Tailwind

// Tipos más específicos y mejor definidos
type ButtonVariant = "link" | "default" | "destructive" | "outline" | "secondary" | "ghost"
type DialogSize = "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full"

interface Props {
  // Props requeridas
  dialogTitle: string
  dialogDescription?: string
  children: ReactNode

  // Props del trigger/botón
  dialogTrigger?: string
  variant?: ButtonVariant
  iconName?: IconName
  buttonDisabled?: boolean // Nombre más consistente
  customTrigger?: ReactNode // Permite trigger personalizado
  buttonSize?: string

  // Props del modal
  dialogSize?: DialogSize // Más semántico que dialogContent
  className?: string // Para el DialogContent

  // Props de control
  open?: boolean // Control externo del estado
  onOpenChange?: (open: boolean) => void // Callback para cambios de estado

  // Accesibilidad
  closeOnEscapeKey?: boolean
  closeOnOverlayClick?: boolean
}

// Mapeo de tamaños más semántico
const sizeClassMap: Record<DialogSize, string> = {
  sm: "sm:max-w-sm",
  md: "sm:max-w-md",
  lg: "sm:max-w-lg",
  xl: "sm:max-w-xl",
  "2xl": "sm:max-w-2xl",
  "3xl": "sm:max-w-3xl",
  full: "sm:max-w-full"
}

const Modal = ({
  dialogTitle,
  dialogDescription,
  children,
  dialogTrigger,
  variant = "default",
  iconName,
  buttonDisabled = false,
  customTrigger,
  dialogSize = "lg",
  buttonSize,
  className,
  open,
  onOpenChange,
  closeOnEscapeKey = true,
  closeOnOverlayClick = true,
}: Props) => {
  // Renderizar trigger personalizado o botón por defecto
  const renderTrigger = () => {
    if (customTrigger) {
      return customTrigger
    }

    // Solo renderizar ActionButton si hay texto para el trigger
    if (!dialogTrigger) return null

    return (
      <ActionButton
        variant={variant}
        iconName={iconName}
        isPending={false}
        disabled={buttonDisabled}
        type="button"
        title={dialogTrigger}
      />
    )
  }

  const trigger = renderTrigger()

  // Si no hay trigger, no renderizar el modal
  if (!trigger) {
    console.warn("ModalComponent: No se proporcionó dialogTrigger ni customTrigger")
    return null
  }

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent
        className={cn(
          "max-w-lg",
          sizeClassMap[dialogSize],
          className
        )}
        onEscapeKeyDown={closeOnEscapeKey ? undefined : (e) => e.preventDefault()}
        onPointerDownOutside={closeOnOverlayClick ? undefined : (e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="mb-2 text-2xl">
            {dialogTitle}
          </DialogTitle>
          {dialogDescription && (
            <DialogDescription className="leading-6">
              {dialogDescription}
            </DialogDescription>
          )}
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  )
}

export default Modal

export type { Props, ButtonVariant, DialogSize }