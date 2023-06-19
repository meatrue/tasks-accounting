import { FC } from "react";

import { TaskStatus } from "../../../../types";
import { statusValues } from "../../../../constants";

import s from "./TaskStatusLabel.module.scss";

interface TaskStatusLabelProps {
  status: TaskStatus;
}

const TaskStatusLabel: FC<TaskStatusLabelProps> = ({ status }) => {
  const classNames = [s.container, s[status]];
  return <span className={classNames.join(" ")}>{statusValues[status]}</span>;
};

export default TaskStatusLabel;
