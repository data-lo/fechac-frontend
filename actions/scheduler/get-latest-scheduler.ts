import getDb from "@/infrastructure/persistence/mongo/get-db";

import { ScheduledJobDto } from "@/infrastructure/applications/schedules/dto/scheduled-job.dto";

export default async function getLatestScheduleExecution(): Promise<ScheduledJobDto | null> {

    const db = await getDb();

    const schedule = await db.scheduledJobs.findOne({
        is_last_schedule: true,
    });

    if (schedule) {
        return {
            ...schedule,
            _id: schedule._id.toString()
        }
    }

    return schedule;
}

