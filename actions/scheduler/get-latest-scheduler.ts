import { getDatabase } from "@/lib/get-database";

import ScheduledJobDocument from "@/models/schedules/scheduled-job-document";

export default async function getLatestScheduleExecution(): Promise<ScheduledJobDocument | null> {

    const db = await getDatabase();

    return await db.scheduledJobs.findOne({
        isLastSchedule: true,
    });
}

