"use server"

import axios from "axios";
import { revalidatePath } from "next/cache";

export default async function stopDagRun(token: string, dagRunId: string) {
    const dagId = process.env.AIRFLOW_MAIN_DAG;

    if (!dagId) throw new Error("AIRFLOW_MAIN_DAG no está definido");

    if (!dagRunId) throw new Error("dagRunId requerido");

    try {
        const response = await axios.patch(`${process.env.AIRFLOW_API}/api/v2/dags/${dagId}/dagRuns/${dagRunId}`,
            {
                state: "failed",
            },
            {
                headers: { Authorization: `Bearer ${token}` }
            });
            
            revalidatePath("/workflows/view");

        return response.data;
    } catch (error: any) {
        throw error;
    }
}
