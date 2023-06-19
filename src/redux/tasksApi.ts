import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { JSON_SERVER_BASE_URL } from "../constants";
import { TaskJSON } from "../types";

export const tasksApi = createApi({
  reducerPath: "tasksApi",
  tagTypes: ["Tasks"],
  baseQuery: fetchBaseQuery({ baseUrl: JSON_SERVER_BASE_URL }),
  endpoints: (builder) => ({
    getTasks: builder.query<TaskJSON[], string>({
      query: () => "/tasks",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Tasks" as const, id })),
              { type: "Tasks", id: "List" },
            ]
          : [{ type: "Tasks", id: "List" }],
    }),
    addTask: builder.mutation({
      query: (body: TaskJSON) => ({
        url: "/tasks",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Tasks", id: "List" }],
    }),
    editTask: builder.mutation({
      query: (body: TaskJSON) => ({
        url: `/tasks/${body.id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: [{ type: "Tasks", id: "List" }],
    }),
  }),
});

export const { useGetTasksQuery, useAddTaskMutation, useEditTaskMutation } =
  tasksApi;
