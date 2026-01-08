export default interface DagRun {
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
  id: string;
  version_number: number;
  dag_id: string;
  bundle_name: string;
  bundle_version: string | null;
  created_at: string;
  bundle_url: string | null;
}
