"use client";

import toast from "react-hot-toast";

import ScheduleSettings from "./scheduled-settings";

interface Props {
    token: string,
    dagRunId: string
    isRunning: boolean;
}

export default function ProcessControls({ token, isRunning, dagRunId }: Props) {

    return (
        <div className="flex flex-col sm:flex-row justify-end gap-4 w-full mt-4 px-2">
            <ScheduleSettings />
        </div>
    );
}