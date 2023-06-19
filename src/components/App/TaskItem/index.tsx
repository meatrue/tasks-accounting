import { FC, useState, createContext } from "react";

import { Task } from "../../../types";
import TaskItemForRead from "./TaskItemForRead";
import TaskItemForEdit from "./TaskItemForEdit";

interface TaskItemProps {
  data: Task;
}

export type TaskEditingContextValue = {
  setIsEditing:
    | React.Dispatch<React.SetStateAction<boolean>>
    | ((isEditing: boolean) => void);
};

export const TaskEditingContext = createContext<TaskEditingContextValue>({
  setIsEditing: (isEditing: boolean) => {},
});

const TaskItem: FC<TaskItemProps> = ({ data }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  return (
    <TaskEditingContext.Provider value={{ setIsEditing }}>
      {!isEditing ? (
        <TaskItemForRead data={data} />
      ) : (
        <TaskItemForEdit data={data} />
      )}
    </TaskEditingContext.Provider>
  );
};

export default TaskItem;
