import { Periodicity } from "@/enums/periodicity"

export default interface ScheduledJob {
    scheduleJobNumber: number
    isLastSchedule: boolean
    periodicity: Periodicity
    lastRunAt: Date | null
    nextRunAt: Date
    createdAt: Date
    updatedAt: Date
}