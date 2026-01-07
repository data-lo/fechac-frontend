"use client";

import toast from "react-hot-toast";
import ActionButton from "@/components/action-button";
import startDagRun from "../../actions/start-dag-run";
import stopDagRun from "../../actions/stop-dag-run";
import ScheduleSettings from "./scheduled-settings";




interface Props {
    token: string,
    dagRunId: string
    isRunning: boolean;
}

export default function ProcessControls({ token, isRunning, dagRunId }: Props) {
    async function handleStart() {
        try {
            await startDagRun(token);

            toast.success("¡Ejecución iniciada correctamente!");
        } catch (error) {
            toast.error("¡Ocurrió un error al iniciar el proceso!");
            console.error("Error al inciar el DAG Run:", error);
        }

    }
    async function handleStop() {
        try {
            await stopDagRun(token, dagRunId);

            toast.success("¡El proceso se detuvo correctamente!");
        } catch (error) {
            toast.error("¡Ocurrió un error al detener el proceso!");
            console.error("Error al detener el DAG Run:", error);
        }
    }
    return (
        <div className="flex flex-col sm:flex-row justify-end gap-4 w-full mt-4 px-2">
            {/* <ActionButton
                iconName="Play"
                title="Iniciar Proceso"
                onClick={handleStart}
                disabled={isRunning}
            />

            <ActionButton
                iconName="CircleStop"
                title="Detener Proceso"
                onClick={handleStop}
                disabled={!isRunning}
            /> */}

            <ScheduleSettings />
        </div>
    );
}