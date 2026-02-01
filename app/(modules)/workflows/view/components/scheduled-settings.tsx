"use client"

import AppDialog from "@/components/app-dialog";

import ScheduleSettingsForm from "./schedule-settings-form";

import { ScheduledJobDto } from "@/applications/schedules/dto/scheduled-job.dto";

interface Props{
    latestSchudale : ScheduledJobDto | null
}

export default function ScheduleSettings({
    latestSchudale
}: Props) {
    return (
        <AppDialog
            dialogTitle="Programar"
            dialogDescription="Selecciona cada cuánto quieres que se ejecute la herramienta de integración digital."
            dialogTrigger="Configurar"
            iconName="Settings"
        >
            <ScheduleSettingsForm latestSchedule={latestSchudale} />
        </AppDialog>

    )
}