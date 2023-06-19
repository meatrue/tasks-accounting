import { configureStore } from "@reduxjs/toolkit";
import { tasksApi } from "./tasksApi";
import authSlice from "./authSlice";
import { usersApi } from "./usersApi";

export const store = configureStore({
  reducer: {
    authSlice,
    [usersApi.reducerPath]: usersApi.reducer,
    [tasksApi.reducerPath]: tasksApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tasksApi.middleware, usersApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type TypedDispatch = typeof store.dispatch;
