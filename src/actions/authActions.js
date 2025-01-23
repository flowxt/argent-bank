import axios from "axios";
import { loginSuccess, logout } from "../reducers/authReducer";

export const login = (credentials, rememberMe) => async (dispatch) => {
  try {
    const response = await axios.post(
      "http://localhost:3001/api/v1/user/login",
      {
        email: credentials.email,
        password: credentials.password,
      }
    );
    const { token } = response.data.body;
    localStorage.setItem("token", token);
    localStorage.setItem("isAuthenticated", "true");

    if (rememberMe) {
      localStorage.setItem("rememberMe", "true");
    } else {
      localStorage.removeItem("rememberMe");
    }
    // Faire une deuxième requête pour récupérer les informations de l'utilisateur
    const userResponse = await axios.post(
      "http://localhost:3001/api/v1/user/profile",
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const { firstName, lastName } = userResponse.data.body;
    localStorage.setItem("firstName", firstName);
    localStorage.setItem("lastName", lastName);
    dispatch(loginSuccess({ firstName, lastName }));
    return Promise.resolve();
  } catch (error) {
    console.error("Login failed:", error);
    return Promise.reject();
  }
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("isAuthenticated");
  localStorage.removeItem("firstName");
  localStorage.removeItem("lastName");
  localStorage.removeItem("token");
  localStorage.removeItem("rememberMe");
  dispatch(logout());
};
