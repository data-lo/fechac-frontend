"use server"

import { ActivationSource } from "@/enums/activation-source";
import axios from "axios";

import { revalidatePath } from "next/cache";

export default async function startDagRun(token: string, activationSource: ActivationSource = ActivationSource.UI) {
  const dagId = process.env.AIRFLOW_MAIN_DAG;

  if (!dagId) throw new Error("AIRFLOW_MAIN_DAG no está definido");

  try {
    const response = await axios.post(`${process.env.AIRFLOW_API}/api/v2/dags/${dagId}/dagRuns`,
      { logical_date: Date.now() },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (activationSource == ActivationSource.UI) {
      revalidatePath("/workflows/view");
    }

    return response.data;
  } catch (error: any) {
    throw error;
  }
}
