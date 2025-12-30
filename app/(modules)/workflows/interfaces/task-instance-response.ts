export interface TaskInstances{
  task_instances: TaskInstance[];
  total_entries: number;
}

export interface TaskInstance {
  id: string;
  task_id: string;
  dag_id: string;
  dag_run_id: string;
  map_index: number;
  logical_date: string;
  run_after: string | null;
  start_date: string | null;
  end_date: string | null;
  duration: number | null;
  state: TaskState;
  try_number: number;
  max_tries: number;
  task_display_name: string;
  dag_display_name: string;
  hostname: string | null;
  unixname: string | null;
  pool: string | null;
  pool_slots: number;
  queue: string | null;
  priority_weight: number;
  operator: string;
  operator_name: string;
  queued_when: string | null;
  scheduled_when: string | null;
  pid: number | null;
  executor: string | null;
  executor_config: string | null;
  note: string | null;
  rendered_map_index: string | null;
  rendered_fields: Record<string, unknown>;
  trigger: Record<string, unknown> | null;
  triggerer_job: Record<string, unknown> | null;
  dag_version: Record<string, unknown> | null;
}

export type TaskState =
  | "success"
  | "failed"
  | "running"
  | "queued"
  | "up_for_retry"
  | "upstream_failed"
  | "skipped"
  | "no_status"
  | "scheduled"
  | "restarting"
  | "removed";
