import { Periodicity } from "@/enums/periodicity"

export default interface ScheduledJob {
    isLastSchedule: boolean
    periodicity: Periodicity
    enabled: boolean
    lastRunAt: Date | null
    nextRunAt: Date
    createdAt: Date
    updatedAt: Date
}