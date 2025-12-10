import axios from "axios";

export async function startDagRun(dagId: string, runId?: string, conf: any = {}) {
  if (!dagId) throw new Error("dagId es requerido");

  try {
    const payload = {
      dagId,
      runId: runId ?? `manual__${Date.now()}`,
      conf,
    };

    const response = await axios.post("/api/airflow/run", payload);

    return response.data;
  } catch (error: any) {
    console.error("Error al iniciar DAG Run:", error?.response?.data || error);
    throw new Error(
      error?.response?.data?.error || "No se pudo iniciar el DAG Run"
    );
  }
}
