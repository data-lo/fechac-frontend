"use client"

import Modal from "@/components/modal";

import ScheduleSettingsForm from "./schedule-settings-form";

export default function ScheduleSettings() {
    return (
        <Modal
            dialogTitle="Programar"
            dialogDescription="Selecciona cada cuánto quieres que se ejecute la herramienta de integración digital."
            dialogTrigger="Configurar Ejecución"
            iconName="Settings"
        >
            <ScheduleSettingsForm />
        </Modal>

    )
}