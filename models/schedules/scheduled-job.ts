import { Periodicity } from "@/enums/periodicity"

export default interface ScheduledJob {
    periodicity: Periodicity
    enabled: boolean
    lastRunAt: Date | null
    nextRunAt: Date
    createdAt: Date
    updatedAt: Date
}