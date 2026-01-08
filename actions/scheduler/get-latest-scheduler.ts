import { getDb } from "@/infrastructure/persistence/mongo/get-db";

import ScheduledJobDocument from "@/models/schedules/scheduled-job-document";

export default async function getLatestScheduleExecution(): Promise<ScheduledJobDocument | null> {

    const db = await getDb();

    return await db.scheduledJobs.findOne({
        isLastSchedule: true,
    });
}

