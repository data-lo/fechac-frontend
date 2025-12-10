"use client";

import ActionButton from "@/components/action-button";
import toast from "react-hot-toast";
import { startDagRun } from "../actions/start-dag-run";
import { stopDagRun } from "../actions/stop-dag-run";

interface ProcessControlsProps {
    token: string,
    dagRunId: string
    isRunning: boolean;
}

export default function ProcessControls({ token, isRunning, dagRunId }: ProcessControlsProps) {
    async function handleStart() {
        try {
            await startDagRun("fechac_test_pipeline");

            toast.success("¡Ejecución iniciada correctamente!");
        } catch (error) {
            toast.error("¡Ocurrió un error al iniciar el proceso!");
        }

    }
    async function handleStop() {
        try {
            await stopDagRun(token, dagRunId);

            toast.success("¡El proceso se detuvo correctamente!");
        } catch (err) {
            console.error("Error al detener el DAG Run:", err);
        }
    }
    return (
        <div className="flex flex-col sm:flex-row justify-end gap-4 w-full mt-4 px-2">
            <ActionButton
                iconName="Play"
                title="Iniciar Proceso"
                onClick={handleStart}
                disabled={isRunning}
                className="sm:w-auto"
            />

            <ActionButton
                iconName="CircleStop"
                title="Detener Proceso"
                onClick={handleStop}
                disabled={!isRunning}
                className="sm:w-auto"
            />
        </div>
    );
}