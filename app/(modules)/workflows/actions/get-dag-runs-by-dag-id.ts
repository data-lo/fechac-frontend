'use server';

import axios from "axios";

import { DagRun } from "../interfaces/dag-run-interface";

export default async function getDagRunsByDagId(
  token: string,
  dagId = process.env.AIRFLOW_MAIN_DAG):
  Promise<
    DagRun[]
  > {

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

  return response.data.dag_runs
}
