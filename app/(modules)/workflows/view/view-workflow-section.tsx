// 1. React
import { Fragment } from "react";

// 2. Componentes globales
import EmptyState from "@/components/empty-state";
import AlertMessage from "@/components/alert-message";
import NavigationBreadcrumb from "@/components/breadcrumb";

// 3. Actions / Servicios


// 4. Componentes locales de la vista
import DagTable from "./components/dag-table";
import TaskList from "./components/task-list";
import ProcessControl from "./components/process-control";

// 5. Tipos / Interfaces
import { DagRun } from "../interfaces/dag-run-interface";
import getAirflowToken from "../actions/get-airflow-token";
import getDagExecutions from "../actions/get-dag-runs-by-dag-id";
import getTask from "../actions/get-dag-run-task-instances";

export default async function ViewWorkflowSection() {
    const token = await getAirflowToken();

    // 1. Obtener ejecuciones
    const executions = await getDagExecutions(token);

    // 2. Validar error en ejecuciones
    if (!executions) {
        return <AlertMessage message="Error al cargar los procesos" buttonText="" />;
    }

    // 3. Inicializar dagRuns
    let dagRuns: DagRun[] = [];

    if (executions.data && executions.data.dagRuns) {
        dagRuns = executions.dagRuns;
    }

    // 4. Obtener el último dagRun
    let lastDagRun: DagRun | null | undefined = null;

    if (dagRuns.length > 0) {
        lastDagRun = dagRuns.at(0);
    }

    // 5. Obtener tareas
    let tasks = null;

    if (lastDagRun) {
        console.log(lastDagRun)
        tasks = await getTask(token, lastDagRun.dag_run_id);
    }

    // 6. Determinar estado actual
    let currentTaskState = null;

    if (lastDagRun) {
        currentTaskState = lastDagRun.state;
    }

    const isRunning = currentTaskState === "running";

    const breadcrumbRoutes = [{ href: "#", title: "PROCESOS" }];

    return (
        <Fragment>
            <nav className="h-12 flex justify-between items-center fixed top-0 left-20 right-0 z-10 bg-white px-6 border-b border-gray-200">
                <NavigationBreadcrumb breadcrumbRoutes={breadcrumbRoutes} />
            </nav>

            {lastDagRun && (
                <ProcessControl
                    token={token}
                    dagRunId={lastDagRun.dag_run_id}
                    isRunning={isRunning}
                />
            )}

            {lastDagRun && tasks && tasks.data && (
                <Fragment>
                    <h2 className="font-bold"> ÚLTIMA EJECUCIÓN</h2>
                    <TaskList tasks={tasks.data.task_instances} />
                </Fragment>
            )}

            {dagRuns.length > 0 ? (
                <Fragment>
                    <h2 className="font-bold">TODAS LAS EJECUCIONES</h2>
                    <DagTable data={dagRuns} />
                </Fragment>
            ) : (
                <EmptyState text="No hay ejecuciones disponibles" />
            )}

        </Fragment>
    );
}
