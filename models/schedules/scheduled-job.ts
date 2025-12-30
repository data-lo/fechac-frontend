import { ObjectId } from "mongodb"

export default interface ScheduledJob {
    _id: ObjectId

    dagRunId: string

    periodicity: "daily" | "weekly" | "biweekly" | "monthly"

    enabled: boolean

    lastRunAt: Date | null

    nextRunAt: Date

    createdAt: Date
    updatedAt: Date
}
