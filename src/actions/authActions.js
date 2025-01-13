import axios from "axios";
import { loginSuccess, logout } from "../reducers/authReducer";

export const login = (credentials) => async (dispatch) => {
  try {
    const response = await axios.post(
      "http://localhost:3001/api/v1/user/login",
      {
        email: credentials.username, // Assurez-vous que le champ correspond à ce que le serveur attend
        password: credentials.password,
      }
    );
    localStorage.setItem("token", response.data.body.token);
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("userName", response.data.body.user.name);
    dispatch(loginSuccess({ userName: response.data.body.user.name }));
  } catch (error) {
    console.error("Login failed:", error);
  }
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("isAuthenticated");
  localStorage.removeItem("userName");
  localStorage.removeItem("token");
  dispatch(logout());
};
