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
import getDagRunTaskInstances from "../actions/get-dag-run-task-instances";

export default async function ViewWorkflowSection() {
    const token = await getAirflowToken();

    // 1. Obtener ejecuciones
    const dagExecutions = await getDagExecutions(token);

    // 2. Validar error en ejecuciones
    if (!dagExecutions) {
        return <AlertMessage message="Error al cargar los procesos" buttonText="" />;
    }

    // 3. Inicializar dagRuns
    let dagRuns: DagRun[] = dagExecutions;

    // 4. Obtener el último dagRun
    let lastDagRun: DagRun | null | undefined = null;

    console.log(dagRuns)

    if (dagRuns && dagRuns.length > 0) {
        lastDagRun = dagRuns.at(0);
    }

    // 5. Obtener tareas
    let tasks = null;

    if (lastDagRun) {
        tasks = await getDagRunTaskInstances(token, lastDagRun.dag_run_id);
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
            {lastDagRun && (
                <ProcessControl
                    token={token}
                    dagRunId={lastDagRun.dag_run_id}
                    isRunning={isRunning}
                />
            )}

            {lastDagRun && tasks && (
                <Fragment>
                    <h2 className="font-bold"> ÚLTIMA EJECUCIÓN</h2>
                    <TaskList tasks={tasks.task_instances} />
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
