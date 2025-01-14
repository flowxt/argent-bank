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
    const { token } = response.data.body;
    localStorage.setItem("token", token);
    localStorage.setItem("isAuthenticated", "true");
    // Vous pouvez également stocker d'autres informations utilisateur si nécessaire
    dispatch(loginSuccess({ userName: credentials.username })); // Utilisez le nom d'utilisateur ou d'autres informations si disponibles
    return Promise.resolve(); // Retourne une promesse résolue pour permettre la redirection
  } catch (error) {
    console.error("Login failed:", error);
    return Promise.reject(); // Retourne une promesse rejetée en cas d'erreur
  }
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("isAuthenticated");
  localStorage.removeItem("userName");
  localStorage.removeItem("token");
  dispatch(logout());
};
