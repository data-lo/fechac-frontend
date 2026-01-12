// 1. React
import { Fragment } from "react";

// 2. Componentes globales
import EmptyState from "@/components/empty-state";
import AlertMessage from "@/components/alert-message";

// 3. Actions / Servicios
import getAirflowToken from "@/actions/workflow/get-airflow-token";
import getDagRunsByDagId from "@/actions/workflow/get-dag-runs-by-dag-id";
import getDagRunTaskInstances from "@/actions/workflow/get-dag-run-task-instances";

// 4. Componentes locales de la vista
import DagTable from "./components/dag-table";
import TaskList from "./components/task-list";
import ProcessControl from "./components/process-control";

// 5. Tipos / Interfaces
import DagRun from "@/interfaces/workflows/dag-run";

export default async function ViewWorkflowSection() {
    const token = await getAirflowToken();

    // 1. Obtener ejecuciones
    const dagExecutions = await getDagRunsByDagId(token);

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
                    <h2 className="font-semibold">Última de Ejecución</h2>
                    <TaskList tasks={tasks.task_instances} />
                </Fragment>
            )}

            {dagRuns.length > 0 ? (
                <Fragment>
                    <h2 className="font-semibold">Historial de Ejecuciones</h2>
                    <DagTable data={dagRuns} />
                </Fragment>
            ) : (
                <EmptyState text="No hay ejecuciones disponibles" />
            )}

        </Fragment>
    );
}
