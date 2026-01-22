
import { ObjectId } from "mongodb";
import getDb from "@/infrastructure/persistence/mongo/get-db";
import getLatestScheduleExecution from "../scheduler/get-latest-scheduler";

export default async function getDocumentsProcessedByScheduleJob() {

    const db = await getDb();

    const lastSchedule = await getLatestScheduleExecution();

    if (!lastSchedule) {
        throw new Error('El reporte aún no está listo.')
    }

    const scheduleJobId = new ObjectId(lastSchedule._id)

    db.projects.aggregate([
        {
            $match: {
                schedule_job_id: scheduleJobId
            }
        },


        {
            $lookup: {
                from: "Documents",
                let: { sadap_id: "$sadap_id" },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $eq: ["$sadap_id", "$$sadapId"]
                            }
                        }
                    }
                ],
                as: "Documents"
            }
        }
    ])

}
