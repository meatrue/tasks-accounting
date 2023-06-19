import { Task, TaskJSON, TaskStatus } from "../types";

export function getTaskFromJSON(task: TaskJSON): Task {
  const statusMap: { [key: string]: TaskStatus } = {
    new: "new",
    wip: "wip",
    closed: "closed",
  };

  return {
    ...task,
    status: statusMap[task.status],
  };
}
