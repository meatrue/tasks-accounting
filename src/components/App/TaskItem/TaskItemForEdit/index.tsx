import {
  FC,
  useContext,
  FormEventHandler,
  MouseEventHandler,
  useState,
} from "react";
import Select, { ActionMeta, MultiValue, SingleValue } from "react-select";

import { useGetUsersQuery } from "../../../../redux/usersApi";
import { useGetUsersOptions } from "../../../../hooks/useGetUsersOptions";
import { useEditTaskMutation } from "../../../../redux/tasksApi";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import { SelectOption, Task, TaskJSON } from "../../../../types";
import { TaskEditingContext } from "..";
import Input from "../../../ui-kit/Input";
import Button, { ButtonColor, ButtonType } from "../../../ui-kit/Button";
import TextArea from "../../../ui-kit/TextArea";
import { statusValues } from "../../../../constants";
import {
  getOptionItemsFromObject,
  getSelectedOption,
  getSelectedOptions,
} from "../../../../utils/select";

import s from "./TaskItemForEdit.module.scss";

interface TaskItemForEditProps {
  data: Task;
}

const TaskItemForEdit: FC<TaskItemForEditProps> = ({ data }) => {
  const { user: userAccount } = useTypedSelector(({ authSlice }) => authSlice);

  const { setIsEditing } = useContext(TaskEditingContext);
  const { id, title, body, status, created_at, owner, assigned_to } = data;

  const { data: users, isLoading: usersIsLoading } = useGetUsersQuery("");
  const executorsOptions = useGetUsersOptions(users);
  const defaultSelectedExecutors = getSelectedOptions(
    executorsOptions,
    assigned_to.map(({ id }) => id)
  );

  const statusOptions = getOptionItemsFromObject(statusValues);
  const defaultSelectedStatus = getSelectedOption(statusOptions, status);

  const [taskTitle, setTaskTitle] = useState<string>(title);
  const [taskBody, setTaskBody] = useState<string>(body);
  const [selectedStatus, setSelectedStatus] = useState<SelectOption>(
    defaultSelectedStatus ?? statusOptions[0]
  );
  const [selectedExecutors, setSelectedExecutors] = useState<SelectOption[]>(
    defaultSelectedExecutors ?? []
  );

  const [updateTask, { isLoading: isTaskLoading }] = useEditTaskMutation();

  const onTaskSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (!taskTitle || !taskBody || !selectedExecutors.length) return;

    const updatedTask: TaskJSON = {
      id,
      title: taskTitle,
      body: taskBody,
      status: selectedStatus.value,
      created_at,
      owner,
      assigned_to: selectedExecutors.map(({ value, label }) => ({
        id: value,
        name: label,
      })),
    };

    await updateTask(updatedTask).unwrap();
    setIsEditing(false);
  };

  const onEditingCancel: MouseEventHandler<HTMLButtonElement> = () => {
    setIsEditing(false);
  };

  const onTaskTitleChange = (value: string) => {
    setTaskTitle(value);
  };

  const onTaskBodyChange = (value: string) => {
    setTaskBody(value);
  };

  const onStatusChange = (
    newValue: SingleValue<SelectOption>,
    actionMeta: ActionMeta<SelectOption>
  ): void => {
    newValue && setSelectedStatus(newValue);
  };

  const onExecutorsChange = (
    newValue: MultiValue<SelectOption>,
    actionMeta: ActionMeta<SelectOption>
  ): void => {
    newValue && newValue.length && setSelectedExecutors([...newValue]);
  };

  return (
    <form onSubmit={onTaskSubmit}>
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

      <div className={s.row}>
        <label className={s.label}>Статус:</label>
        <Select
          className="basic-single"
          classNamePrefix="select"
          defaultValue={selectedStatus}
          name="status"
          options={statusOptions}
          onChange={onStatusChange}
        />
      </div>

      <div className={s.row}>
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
          className="basic-single"
          classNamePrefix="select"
          isMulti
          defaultValue={selectedExecutors}
          isDisabled={usersIsLoading}
          isLoading={usersIsLoading}
          isClearable={true}
          isSearchable={true}
          name="status"
          options={executorsOptions}
          onChange={onExecutorsChange}
        />
      </div>

      <p className={s.row}>Создана: {created_at}</p>
      <p className={s.row}>Автор: {owner.name}</p>

      <div className={s.buttonsContainer}>
        <Button
          className={s.button}
          type={ButtonType.SUBMIT}
          text={isTaskLoading ? "Сохраняем..." : "Сохранить"}
          disabled={
            !userAccount ||
            !taskTitle ||
            !taskBody ||
            !selectedExecutors.length ||
            isTaskLoading
          }
        />
        <Button
          className={s.button}
          type={ButtonType.BUTTON}
          text="Отменить"
          color={ButtonColor.GRAY}
          onClick={onEditingCancel}
          disabled={isTaskLoading}
        />
      </div>
    </form>
  );
};

export default TaskItemForEdit;
