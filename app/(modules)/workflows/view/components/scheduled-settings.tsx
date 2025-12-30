"use client"

import Modal from "@/components/modal";

import ScheduleSettingsForm from "./schedule-settings-form";

export default function ScheduleSettings() {
    return (
        <Modal
            dialogTitle="Programar Ejecuciones"
            dialogTrigger="Configurar"
        >
            <ScheduleSettingsForm />
        </Modal>

    )
}