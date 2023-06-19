import { FC, memo } from "react";

import { useGetTasksQuery } from "../../../redux/tasksApi";
import TaskItem from "../TaskItem";
import { getTaskFromJSON } from "../../../utils/task";

import s from "./TasksList.module.scss";

const TasksList: FC = () => {
  const { data, isLoading } = useGetTasksQuery("");

  return (
    <ul className={s.list}>
      {!isLoading &&
        !!data &&
        !!data.length &&
        data.map((task) => (
          <li key={task.id} className={s.item}>
            <TaskItem data={getTaskFromJSON(task)} />
          </li>
        ))}
    </ul>
  );
};

const MemoTasksList = memo(TasksList);

export default MemoTasksList;
