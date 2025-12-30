'use server';

import axios from "axios";
import { DagRun } from "../interfaces/dag-run-interface";
import { ActionResponse } from "@/interfaces/action/action-response";

export async function getDagExecutions({
  token,
  dagId = process.env.AIRFLOW_MAIN_DAG
}: {
  token: string;
  dagId?: string;
}): Promise<ActionResponse<{
  dagRuns: DagRun[];
}>> {

  try {
    if (!token) {
      return { success: false, error: "Token requerido", data: null };
    }

    if (!dagId) {
      return { success: false, error: "DAG ID requerido", data: null };
    }

    const response = await axios.get(
      `${process.env.AIRFLOW_API}/api/v2/dags/${dagId}/dagRuns`,
      {
        params: {
          limit: 50,
          offset: 0,
          order_by: "-start_date"
        },
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    return {
      success: true,
      error: null,
      data: {
        dagRuns: response.data.dag_runs ?? []
      }
    };

  } catch (error: any) {
    return {
      success: false,
      error: error?.response?.data?.message || error.message,
      data: null
    };
  }
}
