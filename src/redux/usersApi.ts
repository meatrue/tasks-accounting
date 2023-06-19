import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { JSON_SERVER_BASE_URL } from "../constants";
import { User } from "../types";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({ baseUrl: JSON_SERVER_BASE_URL }),
  endpoints: (builder) => ({
    getUsers: builder.query<User[], string>({
      query: () => `/users`,
    }),
  }),
});

export const { useGetUsersQuery } = usersApi;
