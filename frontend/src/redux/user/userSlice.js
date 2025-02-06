import { createSlice } from "@reduxjs/toolkit";

const initalState = {
  currentUser: null,
  loading: false,
};

export const userSlice = createSlice({
  name: "user",
  initalState,
  reducers: {
    LogInStart: (state) => {
      state.loading = true;
    },
    LogInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading= false;
    },
    LogInError: (state) => {
      state.loading = false;
    }
  },
});

export const { LogInSuccess, LogInStart, LogInError } = userSlice.actions;
export default userSlice.reducer;
export const currentUser = (state) => state.user.user;
export const loading = (state) => state.loading.loading;
