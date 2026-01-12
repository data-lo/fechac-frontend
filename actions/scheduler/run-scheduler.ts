'use server'

'use server'

// Enums
import { Periodicity } from "@/enums/periodicity";
import { ActivationSource } from "@/enums/activation-source";

// Helpers / Utils
import { addDays } from "@/functions/add-days";
import { getDaysByPeriodicity } from "@/functions/get-days-by-periodicity";

// External services / Actions (Airflow)
import startDagRun from "../workflow/start-dag-run";
import getAirflowToken from "../workflow/get-airflow-token";
import getLatestScheduleExecution from "./get-latest-scheduler";
import getDagRunsByDagId from "../workflow/get-dag-runs-by-dag-id";

// Database / Repositories
import updateScheduler from "./update-scheduler";
import insertScheduler from "./insert-scheduler";
import countScheduledJobs from "./count-schedules";

// Types / Interfaces
import ActionResponse from "@/interfaces/action/action-response";
import ScheduledJobDocument from "@/models/schedules/scheduled-job-document";


export default async function runScheduler(): Promise<ActionResponse<Partial<ScheduledJobDocument>>> {

    try {
        const currentDate = new Date();

        // Se consulta Airflow para verificar si existe una ejecución activa

        const airflowToken = await getAirflowToken();

        const dagRuns = await getDagRunsByDagId(airflowToken);

        const latestDagRun = dagRuns.at(0) ?? null;

        // Si el DAG no tiene fecha de finalización, significa que aún está en ejecución

        if (latestDagRun && !latestDagRun.end_date) {
            return {
                success: true,
                message: "El pipeline se encuentra actualmente en ejecución.",
                error: null,
                data: null
            };
        }

        const scheduledJobs = await countScheduledJobs();

        // Si no existen un scheduledJobs previos, significa que no se ha definido la periodicidad

        if (!scheduledJobs) {
            return {
                success: true,
                message: "Aún no se ha configurado cada cuánto debe ejecutarse el pipeline.",
                error: null,
                data: null
            };
        }

        const lastSchedule = await getLatestScheduleExecution();

        let periodicity: Periodicity = Periodicity.MONTHLY;

        let lastRunAt: Date | null = null;

        let scheduleJobNumber: number = 0

        // Si existe un schedule previo y el DAG ya finalizó,
        // se actualiza el registro para marcarlo como inactivo

        if (lastSchedule && latestDagRun && latestDagRun.end_date) {

            scheduleJobNumber = lastSchedule.scheduleJobNumber;

            periodicity = lastSchedule.periodicity;

            lastRunAt = new Date(latestDagRun.end_date);

            const filter = { _id: lastSchedule._id }

            const update = {
                updatedAt: new Date(),
                lastRunAt: new Date(latestDagRun.end_date)
            }

            await updateScheduler(filter, update);

            // Si la fecha actual aún no alcanza la próxima ejecución,
            // se detiene el flujo y no se dispara el pipeline

            if (currentDate <= lastSchedule.nextRunAt) {
                return {
                    success: true,
                    message: "Aún no corresponde ejecutar el pipeline según la programación.",
                    error: null,
                    data: null
                };
            }
        }

        //  Desactivar los schedules previos con estatus true

        const data = {
            lastRunAt: lastRunAt,
            createdAt: new Date(),
            updatedAt: new Date(),
            isLastSchedule: true,
            periodicity: periodicity,
            scheduleJobNumber: scheduleJobNumber + 1,
            nextRunAt: addDays(getDaysByPeriodicity(periodicity)),
        }



        await insertScheduler(data)

        // Se inicia la ejecución del Pipeline
        await startDagRun(airflowToken, ActivationSource.OS)

        return {
            success: true,
            message: "Se inició correctamente la ejecución del pipeline.",
            error: null,
            data: data
        }

    } catch (error: any) {
        console.error("Scheduler Error:", error);
        return {
            success: false,
            message: "",
            error: error.message || "Error desconocido.",
            data: null
        };
    }
}