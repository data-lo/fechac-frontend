"use client";

import { Card, CardContent } from "@/components/ui/card";
import { TaskInstance } from "@/interfaces/workflows/task-instances";
import { groupTasksForUI } from "../../utils/group-tasks-for-ui";
import { STATUS_STYLES } from "../../constants/task-status-styles";
import { Badge } from "@/components/ui/badge";

interface TaskListProps {
  tasks: TaskInstance[];
}

const formatDate = (date?: string | null) =>
  date ? new Date(date).toLocaleString("es-MX") : "—";

export default function TaskList({ tasks }: TaskListProps) {
  const uiTasks = groupTasksForUI(tasks);

  return (
    <Card className="shadow-none rounded-md">
      <CardContent>
        <ul className="divide-y text-xs">
          {uiTasks.map((task, index) => {
            const style = STATUS_STYLES[task.state] ?? STATUS_STYLES.no_status;

            return (
              <li
                key={task.label}
                className="grid grid-cols-8 items-center gap-4 py-4"
              >
                <div className="flex items-center gap-3 col-span-4 min-w-0">
                  <span className="font-medium truncate">
                    {index + 1}. {task.label}
                  </span>
                </div>

                <div className="col-span-3 text-gray-600 text-xs">
                  <span className="whitespace-nowrap">
                    {formatDate(task.start_date)}
                  </span>
                  <span className="mx-2 text-gray-400">→</span>
                  <span className="whitespace-nowrap">
                    {formatDate(task.end_date)}
                  </span>
                </div>

                <div className="flex justify-end col-span-1">

                  <Badge
                    variant={"outline"}
                  >
                    {style.label}
                  </Badge>
                </div>
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
}