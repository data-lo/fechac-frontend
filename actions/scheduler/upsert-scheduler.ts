"use server"

import { addDays } from "@/functions/add-days";
import insertScheduler from "./insert-scheduler";
import updateScheduler from "./update-scheduler";
import { Periodicity } from "@/enums/periodicity";
import countScheduledJobs from "./count-schedules";
import getLatestScheduleExecution from "./get-latest-scheduler";
import { getDaysByPeriodicity } from "@/functions/get-days-by-periodicity";


export default async function upsertScheduler(
    periodicity: Periodicity
): Promise<void> {

    const scheduledJobs = await countScheduledJobs();

    if (scheduledJobs === 0) {
        const document = {
            enabled: true,
            lastRunAt: null,
            createdAt: new Date(),
            updatedAt: new Date(),
            periodicity,
            nextRunAt: addDays(getDaysByPeriodicity(periodicity)),
        };

        await insertScheduler(document);
        return;
    }

    const lastSchedule = await getLatestScheduleExecution();

    if (!lastSchedule) {
        return;
    }

    const filter = { _id: lastSchedule._id };

    const update = {
        periodicity,
        updatedAt: new Date(),
        nextRunAt: addDays(getDaysByPeriodicity(periodicity)),
    };

    await updateScheduler(filter, update);
}
