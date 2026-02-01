import { Periodicity } from "@/enums/periodicity"

export default interface ScheduledJob {
    schedule_job_number: number
    is_last_schedule: boolean
    is_report_ready: boolean
    periodicity: Periodicity
    last_run_at: Date | null
    next_run_at: Date
    created_at: Date
    updated_at: Date
}