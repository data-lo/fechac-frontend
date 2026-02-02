import { getAggregatedState } from "./task-state";
import { TASK_LABELS } from "../constants/task-labels";
import { TaskInstance, TaskState } from "@/interfaces/workflows/task-instances";

export interface UiTask {
  label: string;
  state: TaskState;
  start_date: string | null;
  end_date: string | null;
}

export function groupTasksForUI(tasks: TaskInstance[]): UiTask[] {
  const grouped = new Map<string, TaskInstance[]>();

  for (const task of tasks) {
    const label =
      TASK_LABELS[task.task_id] ??
      TASK_LABELS[task.task_display_name] ??
      "Proceso en curso";

    if (!grouped.has(label)) {
      grouped.set(label, []);
    }

    grouped.get(label)!.push(task);
  }

  return Array.from(grouped.entries()).map(([label, group]) => ({
    label,
    state: getAggregatedState(group),
    start_date: group[0].start_date,
    end_date: group[group.length - 1].end_date,
  }));
}