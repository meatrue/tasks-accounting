export type User = {
  id: string;
  name: string;
};

export type AuthorizedUser = {
  id: string;
  name: string;
  password: string;
};

export type TaskStatus = "new" | "wip" | "closed";

export type TaskJSON = {
  id: string;
  title: string;
  status: string;
  body: string;
  created_at: string;
  owner: User;
  assigned_to: User[];
};

export type Task = Omit<TaskJSON, "status"> & {
  status: TaskStatus;
};

export type SelectOption = {
  value: string;
  label: string;
};
