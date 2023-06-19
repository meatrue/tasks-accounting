import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AuthorizedUser } from "../types";
import { JSON_SERVER_BASE_URL } from "../constants";

interface AuthState {
  user: AuthorizedUser | null;
  loading: boolean;
  error: string | null;
}

export const fetchAuthorizedUser = createAsyncThunk<
  AuthorizedUser[],
  { name: string; password: string },
  { rejectValue: string }
>(
  "auth/fetchAuthorizedUser",
  async function (
    { name, password }: { name: string; password: string },
    { rejectWithValue }
  ) {
    const response = await fetch(
      `${JSON_SERVER_BASE_URL}/authorizedUsers?name=${name}&password=${password}`
    );

    if (!response.ok) {
      return rejectWithValue("Ошибка авторизации");
    }

    const result = await response.json();

    if (!result.length) {
      return rejectWithValue("Пользователь с таким именем и паролем не найден");
    }

    return result;
  }
);

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state: AuthState) {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuthorizedUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAuthorizedUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload[0] ?? null;
      })
      .addCase(fetchAuthorizedUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? null;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
