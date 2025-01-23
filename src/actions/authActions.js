// J'importe axios pour mes requetes HTTP
import axios from "axios";
// J'importe mes actions loginSuccess et logout de mon reducer authReducer
import { loginSuccess, logout } from "../reducers/authReducer";

// Action pour gerer ma connexion utilisateur
export const login = (credentials, rememberMe) => async (dispatch) => {
  try {
    // Envoie d'une requete POST pour authentifier l'utilisateur
    const response = await axios.post(
      "http://localhost:3001/api/v1/user/login",
      {
        email: credentials.email,
        password: credentials.password,
      }
    );
    // Je recupere le token de la reponse
    const { token } = response.data.body;
    // Stockage du token dans le local storage
    localStorage.setItem("token", token);
    localStorage.setItem("isAuthenticated", "true");

    // Gestion de l'option "Se souvenir de moi"
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

    // Je récupère le prénom et le nom de l'utilisateur
    const { firstName, lastName } = userResponse.data.body;

    // Je stocke dans mon local storage le prénom et le nom de l'utilisateur
    localStorage.setItem("firstName", firstName);
    localStorage.setItem("lastName", lastName);

    // dispatch de l'action loginSuccess
    dispatch(loginSuccess({ firstName, lastName }));

    // Résolution de la promesse pour indiquer que la connexion a réussi
    return Promise.resolve();
  } catch (error) {
    // J'affiche une erreur dans la console si echec de connexion
    console.error("Login failed:", error);
    // rejet de la promesse pour indiquer que la connexion a échoué
    return Promise.reject();
  }
};

// Action pour gérer la deconnexion de l'user
export const logoutUser = () => (dispatch) => {
  // Suppression des info de l'utilisateur dans le local storage
  localStorage.removeItem("isAuthenticated");
  localStorage.removeItem("firstName");
  localStorage.removeItem("lastName");
  localStorage.removeItem("token");
  localStorage.removeItem("rememberMe");
  // Dispatch de l'action logout pour réinitialiser l'authentification
  dispatch(logout());
};
