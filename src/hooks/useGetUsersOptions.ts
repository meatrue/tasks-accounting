import { useMemo } from "react";

import { SelectOption, User } from "../types";

export function useGetUsersOptions(users: User[] | undefined): SelectOption[] {
  const usersOptions: SelectOption[] = useMemo(
    () =>
      users && users.length
        ? users.map(({ id, name }) => ({
            value: id,
            label: name,
          }))
        : [],
    [users]
  );

  return usersOptions;
}
