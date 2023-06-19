import { FC, FormEventHandler, memo, useState } from "react";
import Select, { ActionMeta, MultiValue } from "react-select";
import { v4 } from "uuid";

import { useTypedSelector } from "../../../hooks/useTypedSelector";
import Input from "../../ui-kit/Input";
import Button, { ButtonColor, ButtonType } from "../../ui-kit/Button";
import TextArea from "../../ui-kit/TextArea";
import { useGetUsersQuery } from "../../../redux/usersApi";
import { SelectOption, TaskJSON } from "../../../types";
import { useAddTaskMutation } from "../../../redux/tasksApi";
import { TASK_STATUS_DEFAULT } from "../../../constants";
import { formatDate } from "../../../utils/date";
import { useGetUsersOptions } from "../../../hooks/useGetUsersOptions";

import s from "./AddTaskForm.module.scss";

interface AddTaskFormProps {
  className?: string;
}

const AddTaskForm: FC<AddTaskFormProps> = ({ className }) => {
  const { user: userAccount } = useTypedSelector(({ authSlice }) => authSlice);

  const [taskTitle, setTaskTitle] = useState<string>("");
  const [taskBody, setTaskBody] = useState<string>("");
  const [taskExecutors, setTaskExecutors] = useState<SelectOption[]>([]);

  const { data: users, isLoading: usersIsLoading } = useGetUsersQuery("");
  const executorsOptions = useGetUsersOptions(users);

  const [addTask, { isLoading: isTaskLoading }] = useAddTaskMutation();

  const onTaskTitleChange = (value: string): void => {
    setTaskTitle(value);
  };

  const onTaskBodyChange = (value: string): void => {
    setTaskBody(value);
  };

  const onExecutorsChange = (
    newValue: MultiValue<SelectOption>,
    actionMeta: ActionMeta<SelectOption>
  ): void => {
    setTaskExecutors([...newValue]);
  };

  const clearTask = (): void => {
    setTaskTitle("");
    setTaskBody("");
    setTaskExecutors([]);
  };

  const onTaskSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (!taskTitle || !taskBody || !taskExecutors.length) return;

    const newTask: TaskJSON = {
      id: v4(),
      title: taskTitle,
      body: taskBody,
      status: TASK_STATUS_DEFAULT,
      created_at: formatDate(new Date()),
      owner: users?.find(({ id }) => id === userAccount?.id) ?? {
        id: "",
        name: "",
      },
      assigned_to: taskExecutors.map(({ value, label }) => ({
        id: value,
        name: label,
      })),
    };

    await addTask(newTask).unwrap();
    clearTask();
  };

  const onTaskReset: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    clearTask();
  };

  const classNames = [s.container];
  className && classNames.push(className);

  return (
    <div className={classNames.join(" ")}>
      <h2 className={s.title}>Добавить задачу</h2>
      <form onSubmit={onTaskSubmit} onReset={onTaskReset}>
        <div className={s.row}>
          <label className={s.label}>Название:</label>
          <Input
            className={s.textInput}
            type="text"
            value={taskTitle}
            placeholder="Название задачи"
            onChange={onTaskTitleChange}
          />
        </div>

        <div className={s.descriptionContainer}>
          <label className={s.label}>Описание:</label>
          <TextArea
            className={s.textarea}
            value={taskBody}
            placeholder="Описание задачи"
            onChange={onTaskBodyChange}
          />
        </div>

        <div className={s.row}>
          <label className={s.label}>Назначена: </label>
          <Select
            className={`basic-single ${s.select}`}
            classNamePrefix="select"
            isMulti
            defaultValue={taskExecutors}
            value={taskExecutors}
            isDisabled={usersIsLoading}
            isLoading={usersIsLoading}
            isClearable={true}
            isSearchable={true}
            name="status"
            options={executorsOptions}
            onChange={onExecutorsChange}
          />
        </div>

        <div className={s.buttonsContainer}>
          <Button
            className={s.button}
            type={ButtonType.SUBMIT}
            text={isTaskLoading ? "Сохраняем..." : "Добавить"}
            disabled={
              !taskTitle || !taskBody || !taskExecutors.length || isTaskLoading
            }
          />
          <Button
            className={s.button}
            type={ButtonType.RESET}
            text="Очистить"
            color={ButtonColor.GRAY}
            disabled={!taskTitle && !taskBody && !taskExecutors.length}
          />
        </div>
      </form>
    </div>
  );
};

const MemoAddTaskForm = memo(AddTaskForm);

export default MemoAddTaskForm;
