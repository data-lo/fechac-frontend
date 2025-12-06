import axios from "axios";

import { DagRun } from "../interfaces/dag-run-interface";

export const getDag = async (
  token: string,
  dagId: string | undefined = process.env.AIRFLOW_MAIN_DAG
): Promise<DagRun[]> => {
  try {
    const response = await axios.get(
      `${process.env.AIRFLOW_API}/api/v2/dags/${dagId}/dagRuns?limit=10&order_by=-start_date`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.dag_runs;

  } catch (error: any) {
    console.error("Error obteniendo DAG:", error?.response?.data || error.message);
    throw new Error(
      `Error al obtener DAG: ${error?.response?.status} ${error?.response?.statusText}`
    );
  }
};
