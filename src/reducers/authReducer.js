import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  firstName: "",
  lastName: "",
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.firstName = "";
      state.lastName = "";
      state.token = null;
    },
    updateUserProfileSuccess: (state, action) => {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
    },
  },
});

export const { loginSuccess, logout, updateUserProfileSuccess } =
  authSlice.actions;
export default authSlice.reducer;
