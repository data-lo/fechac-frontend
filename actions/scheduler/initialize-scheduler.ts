'use server'

// Enums
import { Periodicity } from "@/enums/periodicity";
import { ActivationSource } from "@/enums/activation-source";

// Helpers / Utils
import { getDaysByPeriodicity } from "@/functions/get-days-by-periodicity";

// External services / Actions (Airflow)
import startDagRun from "@/app/(modules)/workflows/actions/start-dag-run";
import getAirflowToken from "@/app/(modules)/workflows/actions/get-airflow-token";
import getDagRunsByDagId from "@/app/(modules)/workflows/actions/get-dag-runs-by-dag-id";

// Database / Repositories
import { updateScheduler } from "./update-scheduler";
import { insertScheduler } from "./insert-scheduler";
import { getLatestScheduleExecution } from "./get-latest-scheduler";


export default async function initializeScheduler() {

    const currentDate = new Date();

    // Airflow
    const airflowToken = await getAirflowToken();
    const dagRuns = await getDagRunsByDagId(airflowToken);
    const latestDagRun = dagRuns.at(0) ?? null;

    // Hay una ejecución en curso
    if (latestDagRun && !latestDagRun.end_date) {
        return;
    }

    const lastSchedule = await getLatestScheduleExecution();

    if (!lastSchedule) {
        return
    }

    let periodicity: Periodicity = Periodicity.MONTHLY;

    let lastRunAt: Date | null = null;

    // Actualizar el ultimo scheduled para indicar cuando termino el proceso y decir que ya no esta activo

    if (lastSchedule && latestDagRun && latestDagRun.end_date) {

        periodicity = lastSchedule.periodicity;

        lastRunAt = new Date(latestDagRun.end_date);

        const filter = { _id: lastSchedule._id }

        const update = {
            enabled: false,
            updatedAt: new Date(),
            lastRunAt: new Date(latestDagRun.end_date)
        }

        await updateScheduler(filter, update);
    }

    if (currentDate <= lastSchedule.nextRunAt) {
        return;
    }
    
    const data = {
        enabled: true,
        lastRunAt: lastRunAt,
        createdAt: new Date(),
        updatedAt: new Date(),
        periodicity: periodicity,
        nextRunAt: addDays(getDaysByPeriodicity(periodicity)),
    }
    await insertScheduler(data)

    await startDagRun(airflowToken, ActivationSource.OS)

    return
}