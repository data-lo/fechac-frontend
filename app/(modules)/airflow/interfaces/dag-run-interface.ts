export interface DagRun {
  dag_run_id: string;
  dag_id: string;
  logical_date: string;
  queued_at: string | null;
  start_date: string | null;
  end_date: string | null;
  data_interval_start: string;
  data_interval_end: string;
  run_after: string;
  last_scheduling_decision: string | null;
  run_type: string;
  state: "success" | "failed" | "running" | "queued" | string;
  triggered_by: string | null;
  conf: Record<string, any>;
  note: string | null;
  dag_versions: DagVersion[];
}

export interface DagVersion {
  version: number;
  created_at: string;
}

export type DagRunsResponse = DagRun[];
