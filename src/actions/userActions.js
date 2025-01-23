// Importation d'axios pour effectuer des requêtes HTTP
import axios from "axios";

// Importation de l'action updateUserProfileSuccess depuis le réducteur authReducer
import { updateUserProfileSuccess } from "../reducers/authReducer";

// Action pour mettre à jour le profil utilisateur
export const updateUserProfile = (profileData) => async (dispatch) => {
  try {
    // Récupération du token depuis le localStorage
    const token = localStorage.getItem("token");

    // Envoi d'une requête PUT pour mettre à jour le profil utilisateur
    const response = await axios.put(
      "http://localhost:3001/api/v1/user/profile",
      profileData,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    // Dispatch de l'action updateUserProfileSuccess avec les données de la réponse
    dispatch(updateUserProfileSuccess(response.data.body));
  } catch (error) {
    // Affichage de l'erreur en cas d'échec de la mise à jour du profil
    console.error("Failed to update user profile:", error);
  }
};
