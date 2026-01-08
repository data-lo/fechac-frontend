"use client";

import { CheckCircle, PlayCircle, XCircle, Clock, Loader2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { TaskInstance } from "../../../../../interfaces/workflows/task-instances";
import ActionButton from "@/components/action-button";
import { JSX } from "react";

interface TaskListProps {
  tasks: TaskInstance[];
  title?: string;
}

/* Mapeo nombres → español */
const taskNameMap: Record<string, string> = {
  validate_microsoft_session: "VALIDAR SESIÓN DE MICROSOFT",
  process_shared_with_me_folders: "PROCESAR CARPETAS COMPARTIDAS",
  cache_pending_projects_task: "GUARDAR PROYECTOS PENDIENTES",
  document_project_matching_task: "MATCHING DE DOCUMENTOS Y PROYECTOS",
  post_matching_processing_task: "PROCESAMIENTO POST-MATCHING",
  transfer_files_to_minio_task: "TRANSFERIR ARCHIVOS A MINIO",
  semantic_search_task: "BÚSQUEDA SEMÁNTICA",
  weight_computation_task: "CÁLCULO DE PESOS",
  upload_to_sharepoint_task: "SUBIR A SHAREPOINT",
  default: "TAREA DESCONOCIDA",
};

const statusStyles: Record<
  string,
  { icon: JSX.Element; badge: string; label: string }
> = {
  success: {
    icon: <CheckCircle className="w-4 h-4 text-green-600" />,
    badge: "bg-green-100 text-green-700",
    label: "EXITOSO",
  },
  failed: {
    icon: <XCircle className="w-4 h-4 text-red-600" />,
    badge: "bg-red-100 text-red-700",
    label: "FALLIDO",
  },
  running: {
    icon: <PlayCircle className="w-4 h-4 text-blue-600" />,
    badge: "bg-blue-100 text-blue-700",
    label: "EN EJECUCIÓN",
  },
  skipped: {
    icon: <PlayCircle className="w-4 h-4 text-gray-600" />,
    badge: "bg-gray-100 text-gray-700",
    label: "OMITIDO",
  },
  default: {
    icon: <Clock className="w-4 h-4 text-yellow-600" />,
    badge: "bg-yellow-100 text-yellow-700",
    label: "EN COLA",
  },
};

export default function TaskList({ tasks }: TaskListProps) {
  return (
    <Card className="shadow-none rounded-none border-none">
      <CardContent>
        <ul className="w-full">
          {tasks.map((task, index) => {
            const style = statusStyles[task.state] ?? statusStyles.default;

            const taskName =
              taskNameMap[task.task_id] ??
              taskNameMap[task.task_display_name] ??
              task.task_display_name.toUpperCase();

            return (
              <li
                key={task.id}
                className={`grid grid-cols-6 items-center gap-4 p-4 text-xs ${index !== tasks.length - 1 ? "border-b" : ""
                  } hover:bg-gray-50`}
              >
                {/* COLS 1-2 → ICONO + NOMBRE (más espacio) */}
                <div className="flex items-center gap-3 col-span-2 min-w-0">
                  {style.icon}
                  <span className="font-medium text-gray-800 truncate">{taskName}</span>
                </div>

                {/* COL 3 → START DATE */}
                <div className="text-gray-600 font-medium whitespace-nowrap">
                  {task.start_date ? new Date(task.start_date).toLocaleString("es-MX") : "—"}
                </div>

                {/* COL 4 → END DATE */}
                <div className="text-gray-600 font-medium whitespace-nowrap">
                  {task.end_date ? new Date(task.end_date).toLocaleString("es-MX") : "—"}
                </div>

                {/* COLS 5-6 → ESTATUS + BOTÓN */}
                <div className="flex items-center gap-2 justify-end col-span-2">
                  <span
                    className={`px-2 py-1 rounded font-semibold whitespace-nowrap ${style.badge}`}
                  >
                    {style.label}
                  </span>

                  {/* {task.state === "running" && (
                    <ActionButton iconName="Eye" variant="ghost" className="w-min" />
                  )} */}
                </div>
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
}
