"use client";

// Domain / DTOs
import { ScheduledJobDto } from "@/applications/schedules/dto/scheduled-job.dto";

// Local components
import ReportDownloads from "./report-downloads";
import ScheduleSettings from "./scheduled-settings";

interface Props {
    token: string,
    dagRunId: string
    isRunning: boolean;
    lastSchedule: ScheduledJobDto | null;
}

export default function ProcessControls({ lastSchedule }: Props) {

    return (
        <div className="flex flex-col sm:flex-row justify-end gap-4 w-full mt-4 px-2">
            <ScheduleSettings
                latestSchudale={lastSchedule}
            />
            <ReportDownloads />
        </div>
    );
}