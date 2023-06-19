import { FC, MouseEventHandler, useContext } from "react";

import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import { TaskEditingContext } from "..";
import { Task } from "../../../../types";
import EditButton from "../../EditButton";
import TaskStatusLabel from "../TaskStatusLabel";

import s from "./TaskItemForRead.module.scss";

interface TaskItemForReadProps {
  data: Task;
}

const TaskItemForRead: FC<TaskItemForReadProps> = ({ data }) => {
  const { user: userAccount } = useTypedSelector(({ authSlice }) => authSlice);
  const { setIsEditing } = useContext(TaskEditingContext);
  const { title, body, status, created_at, owner, assigned_to } = data;

  const onEditButtonClick: MouseEventHandler<HTMLButtonElement> = () => {
    setIsEditing(true);
  };

  return (
    <div className={s.container}>
      <div className={s.header}>
        <h3 className={s.title}>{title}</h3>
        {userAccount && <EditButton onClick={onEditButtonClick} />}
      </div>

      <p className={s.row}>
        <TaskStatusLabel status={status} />
      </p>
      <p className={s.row}>{body}</p>
      <div className={s.row}>
        Назначена: {assigned_to.map(({ name }) => name).join(", ")}
      </div>
      <p className={`${s.row} ${s.additional}`}>Создана: {created_at}</p>
      <p className={`${s.row} ${s.additional}`}>Автор: {owner.name}</p>
    </div>
  );
};

export default TaskItemForRead;
