'use server'

import getCollection from "@/lib/mongodb";

import { Periodicity } from "@/enums/periodicity";
import { ActivationSource } from "@/enums/activation-source";

import ScheduledJob from "@/models/schedules/scheduled-job-document";

import { getDaysByPeriodicity } from "@/functions/get-days-by-periodicity";

import startDagRun from "@/app/(modules)/workflows/actions/start-dag-run";
import getAirflowToken from "@/app/(modules)/workflows/actions/get-airflow-token";
import getDagRunsByDagId from "@/app/(modules)/workflows/actions/get-dag-runs-by-dag-id";

export default async function initializeScheduler(data: ScheduledJob | null) {

    const schedulesCollection = await getCollection<ScheduledJob>("schedules")

    const currentDate = new Date();

    // Airflow
    const airflowToken = await getAirflowToken();
    const dagRuns = await getDagRunsByDagId(airflowToken);
    const latestDagRun = dagRuns.at(0) ?? null;

    // Hay una ejecución en curso
    if (latestDagRun && !latestDagRun.end_date) {
        return;
    }

    const lastSchedule = await schedulesCollection.findOne({
        lastExecution: true,
    });

    let periodicity: Periodicity = Periodicity.MONTHLY;

    let lastRunAt: Date | null = null;

    // Actualizar el ultimo scheduled para indicar cuando termino el proceso y decir que ya no esta activo

    if (lastSchedule && latestDagRun && latestDagRun.end_date) {

        periodicity = lastSchedule.periodicity;

        lastRunAt = new Date(latestDagRun.end_date);

        await schedulesCollection.updateOne(
            { _id: lastSchedule._id },
            {
                $set: {
                    enabled: false,
                    updatedAt: new Date(),
                    lastRunAt: new Date(latestDagRun.end_date)
                },
            }
        );
    }

    if (!lastSchedule) {
        await schedulesCollection.insertOne({
            periodicity: periodicity,
            nextRunAt: addDays(getDaysByPeriodicity(periodicity)),
            lastRunAt: null,
            enabled: true,
            updatedAt: new Date(),
            createdAt: new Date()
        });
        return
    }

    if (currentDate <= lastSchedule.nextRunAt) {
        return;
    }

    await schedulesCollection.insertOne({
        periodicity: periodicity,
        nextRunAt: addDays(getDaysByPeriodicity(periodicity)),
        lastRunAt: lastRunAt,
        enabled: true,
        updatedAt: new Date(),
        createdAt: new Date()
    })

    await startDagRun(airflowToken, ActivationSource.OS)

    return
}