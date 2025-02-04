import axios from "axios"; // Import de la bibliothèque axios pour effectuer des requêtes HTTP
import { loginSuccess, logout } from "../reducers/authReducer"; // Importation des actions Redux pour gérer l'authentification

// Fonction pour connecter un utilisateur (Objet contenant l'email et le mot de passe de l'utilisateur. Indique si l'utilisateur souhaite être mémorisé sur son appareil.)
export const login = (credentials, rememberMe) => async (dispatch) => {
  try {
    // Envoi de la requête POST à l'API pour tenter de se connecter avec les identifiants fournis
    const response = await axios.post(
      "http://localhost:3001/api/v1/user/login",
      {
        email: credentials.email,
        password: credentials.password,
      }
    );
    // Récupération du token JWT depuis la réponse de l'API
    const { token } = response.data.body;
    // Stockage du token dans le localStorage pour maintenir la session de l'utilisateur
    localStorage.setItem("token", token);

    // Si l'utilisateur souhaite être mémorisé, on stocke cette préférence
    if (rememberMe) {
      localStorage.setItem("rememberMe", "true");
    } else {
      localStorage.removeItem("rememberMe"); // Sinon, on supprime la préférence
    }

    // Deuxième requête pour récupérer les informations du profil utilisateur
    const userResponse = await axios.post(
      "http://localhost:3001/api/v1/user/profile",
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    // Extraction du prénom et du nom de l'utilisateur depuis la réponse de l'API
    const { firstName, lastName } = userResponse.data.body;

    // Mise à jour de l'état global Redux avec les informations de l'utilisateur
    dispatch(loginSuccess({ firstName, lastName, token }));

    return Promise.resolve(); // Indique que l'opération s'est bien déroulée
  } catch (error) {
    console.error("Login failed:", error); // Affichage d'une erreur en cas d'échec
    return Promise.reject();
  }
};

// Fonction pour gérer la déconnexion de l'utilisateur.
export const logoutUser = () => (dispatch) => {
  // Suppression du token et des préférences de connexion du localStorage
  localStorage.removeItem("token");
  localStorage.removeItem("rememberMe");
  // Dispatch de l'action Redux pour mettre à jour l'état global et déconnecter l'utilisateur
  dispatch(logout());
};
