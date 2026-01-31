"use client";

import toast from "react-hot-toast";

import ScheduleSettings from "./scheduled-settings";

import { ScheduledJobDto } from "@/applications/schedules/dto/scheduled-job.dto";
import ReportDownloads from "./report-downloads";

interface Props {
    token: string,
    dagRunId: string
    isRunning: boolean;
    lastSchedule: ScheduledJobDto | null;
}

export default function ProcessControls({ token, isRunning, dagRunId, lastSchedule }: Props) {

    return (
        <div className="flex flex-col sm:flex-row justify-end gap-4 w-full mt-4 px-2">
            <ScheduleSettings
                latestSchudale={lastSchedule}
            />
            <ReportDownloads />
        </div>
    );
}