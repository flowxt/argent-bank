import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  firstName: "",
  lastName: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.firstName = "";
      state.lastName = "";
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
