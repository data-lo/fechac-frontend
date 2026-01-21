"use server"

import { addDays } from "@/functions/add-days";
import insertScheduler from "./insert-scheduler";
import updateScheduler from "./update-scheduler";
import { Periodicity } from "@/enums/periodicity";
import countScheduledJobs from "./count-schedules";
import getLatestScheduleExecution from "./get-latest-scheduler";
import { getDaysByPeriodicity } from "@/functions/get-days-by-periodicity";
import { ObjectId } from "mongodb";


export default async function upsertScheduler(
    periodicity: Periodicity
): Promise<void> {

    const scheduledJobs = await countScheduledJobs();

    if (scheduledJobs === 0) {
        const document = {
            is_last_schedule: true,
            schedule_job_number: 1,
            last_run_at: null,
            created_at: new Date(),
            updated_at: new Date(),
            periodicity,
            is_report_ready: false,
            next_run_at: addDays(getDaysByPeriodicity(periodicity)),

        };

        await insertScheduler(document);
        return;
    }

    const lastSchedule = await getLatestScheduleExecution();

    if (!lastSchedule) {
        return;
    }

    const filter = { _id: new ObjectId(lastSchedule._id) };

    const update = {
        periodicity,
        updated_at: new Date(),
        nextRun_at: addDays(getDaysByPeriodicity(periodicity)),
    };

    await updateScheduler(filter, update);
}
