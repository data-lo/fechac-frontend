import axios from "axios";
import { TaskInstances } from "../interfaces/task-instance-response";
import { ActionResponse } from "@/interfaces/action/action-response";

export default async function getTask(
  token: string,
  dagRunId: string,
  dagId = process.env.AIRFLOW_MAIN_DAG,
): Promise<ActionResponse<TaskInstances>> {
  try {
    const response = await axios.get<TaskInstances>(
      `${process.env.AIRFLOW_API}/api/v2/dags/${dagId}/dagRuns/${dagRunId}/taskInstances`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    return {
      success: true,
      error: null,
      data: response.data
    };

  } catch (error: unknown) {

    const message =
      axios.isAxiosError(error)
        ? error.response?.data?.message || error.message
        : "Unexpected error while fetching task instances.";

    return {
      success: false,
      error: message,
      data: null
    };
  }
}
