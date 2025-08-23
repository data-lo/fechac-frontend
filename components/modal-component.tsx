import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { LucideIcon } from "lucide-react";


import { ReactNode } from "react"
import Button from "./action-button";

type variant = "link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | null | undefined;

interface Props {
  dialogTitle: string
  dialogDescription: string
  dialogTrigger?: string
  dialogContent?: string;
  children: ReactNode
  variant?: variant;
  sizeButton?: string;
  className?: string
  icon?: LucideIcon;
  buttonDisable?: boolean;
}

const ModalComponent = ({
  dialogTitle,
  dialogTrigger,
  dialogDescription,
  children,
  buttonDisable = false,
  sizeButton = 'sm:w-[338px]',
  variant = 'default',
  icon: Icon,
  dialogContent = 'sm:max-w-3xl'
}: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {/* <Button
          sizeButton={sizeButton}
          variant={variant}
          icon={Icon}
          isPending={false}
          disabled={buttonDisable}
          type="button"
          title={dialogTrigger}
        /> */}
      </DialogTrigger>
      <DialogContent className={`max-w-lg ${dialogContent}`}>
        <DialogHeader>
          <DialogTitle className={`mb-2 text-2xl`}>
            {dialogTitle}
          </DialogTitle>
          <DialogDescription>
            {dialogDescription}
          </DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  )
}

export default ModalComponent;