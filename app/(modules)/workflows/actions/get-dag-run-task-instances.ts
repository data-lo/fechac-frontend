import axios from "axios";

import { TaskInstances } from "../interfaces/task-instance-response";

export default async function getDagRunTaskInstances(
  token: string,
  dagRunId: string,
  dagId = process.env.AIRFLOW_MAIN_DAG,
): Promise<TaskInstances> {

  const response = await axios.get<TaskInstances>(
    `${process.env.AIRFLOW_API}/api/v2/dags/${dagId}/dagRuns/${dagRunId}/taskInstances`,
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  );

  return response.data
}
