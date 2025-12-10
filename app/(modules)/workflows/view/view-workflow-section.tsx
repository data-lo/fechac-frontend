// 1. React
import { Fragment } from "react";

// 2. Componentes globales
import AlertMessage from "@/components/alert-message";
import EmptyState from "@/components/empty-state";
import NavigationBreadcrumb from "@/components/breadcrumb";

// 3. Componentes compartidos
import PaginationComponent from "@/components/pagination"; // <-- (No lo usas, puedes eliminarlo si quieres)

// 4. Actions / Servicios
import { getDagExecutions } from "./actions/get-dag-executions";
import getTask from "./actions/get-task";
import { getToken } from "./actions/get-token";

// 5. Componentes de la vista
import DagTable from "./components/dag-table";
import TaskList from "./components/task-list";
import ActionButton from "@/components/action-button";
import { startDagRun } from "./actions/start-dag-run";
import toast from "react-hot-toast";
import { stopDagRun } from "./actions/stop-dag-run";
import ProcessControl from "./components/process-control";

const ViewWorkflowSection = async () => {
    const token = await getToken();

    // Obtener DAG runs
    const executionsResponse = await getDagExecutions({ token });

    if (!executionsResponse.success || !executionsResponse.data) {
        return (
            <div className="px-6 py-4">
                <AlertMessage
                    buttonText="Recargar Página"
                    message={executionsResponse.error ?? "Error desconocido"}
                />
            </div>
        );
    }

    const { dagRuns } = executionsResponse.data;

    // Si hay dagRuns, obtener tareas del primero
    let tasksResponse = null;

    if (dagRuns.length > 0) {
        tasksResponse = await getTask(
            token,
            dagRuns[0].dag_run_id
        );
    }

    if (!tasksResponse) {
        return <AlertMessage message="Error al cargar tareas" buttonText={""} />;
    }

    const currentTaskState = dagRuns[0].state

    const isRunning = currentTaskState === "running";

    const breadcrumbRoutes = [{ href: "#", title: "LOTES" }];

    return (
        <Fragment>
            <nav className="h-12 flex justify-between items-center fixed top-0 left-20 right-0 z-10 bg-white px-6 border-b border-gray-200">
                <NavigationBreadcrumb breadcrumbRoutes={breadcrumbRoutes} />
            </nav>

            <ProcessControl
                token={token}
                dagRunId={dagRuns[0].dag_run_id}
                isRunning={isRunning}
            />

            {dagRuns.length > 0 && tasksResponse.data && (
                <TaskList
                    title={`PROCESO ${dagRuns[0].dag_versions[0].version_number} EN EJECUCIÓN`}
                    tasks={tasksResponse.data.task_instances}
                />
            )}

            {dagRuns.length > 0 ? (
                <DagTable data={dagRuns} />
            ) : (
                <EmptyState text="No hay ejecuciones disponibles" />
            )}
        </Fragment>
    );
};

export default ViewWorkflowSection;
