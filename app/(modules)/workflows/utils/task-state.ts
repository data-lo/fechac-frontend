import { TaskInstance, TaskState } from "@/interfaces/workflows/task-instances";

export function getAggregatedState(tasks: TaskInstance[]): TaskState {
  if (tasks.some(t => t.state === "running")) return "running";
  if (tasks.some(t => t.state === "failed")) return "failed";
  if (tasks.some(t => t.state === "up_for_retry")) return "up_for_retry";
  if (tasks.some(t => t.state === "queued" || t.state === "scheduled"))
    return "queued";
  if (tasks.every(t => t.state === "success")) return "success";

  return "no_status";
}