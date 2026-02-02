import { CheckCircle, XCircle, PlayCircle, Clock } from "lucide-react";

import { TaskState } from "@/interfaces/workflows/task-instances";

export const STATUS_STYLES: Record<
  TaskState,
  {
    icon: React.ElementType;
    label: string;
    className: string;
  }
> = {
  success: {
    icon: CheckCircle,
    label: "EXITOSO",
    className: "bg-green-100 text-green-700",
  },
  failed: {
    icon: XCircle,
    label: "FALLIDO",
    className: "bg-red-100 text-red-700",
  },
  running: {
    icon: PlayCircle,
    label: "EN EJECUCIÓN",
    className: "bg-blue-100 text-blue-700",
  },
  queued: {
    icon: Clock,
    label: "EN COLA",
    className: "bg-gray-100 text-gray-700",
  },
  up_for_retry: {
    icon: Clock,
    label: "REINTENTANDO",
    className: "bg-yellow-100 text-yellow-700",
  },
  upstream_failed: {
    icon: XCircle,
    label: "FALLIDO",
    className: "bg-red-100 text-red-700",
  },
  skipped: {
    icon: Clock,
    label: "OMITIDO",
    className: "bg-gray-100 text-gray-500",
  },
  scheduled: {
    icon: Clock,
    label: "PROGRAMANDO",
    className: "bg-gray-100 text-gray-700",
  },
  restarting: {
    icon: PlayCircle,
    label: "REINICIANDO",
    className: "bg-blue-100 text-blue-700",
  },
  removed: {
    icon: XCircle,
    label: "ELIMINANDO",
    className: "bg-gray-200 text-gray-600",
  },
  no_status: {
    icon: Clock,
    label: "SIN ESTADO",
    className: "bg-gray-100 text-gray-500",
  },
};