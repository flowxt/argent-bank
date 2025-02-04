import axios from "axios";
import { updateUserProfileSuccess } from "../reducers/authReducer"; // Importation de l'action Redux pour mettre à jour le profil utilisateur

// Fonction asynchrone pour mettre à jour le profil de l'utilisateur.
export const updateUserProfile =
  (profileData) => async (dispatch, getState) => {
    try {
      // Récupération du token d'authentification depuis le store Redux
      const token = getState().auth.token;
      // Envoi d'une requête PUT à l'API pour mettre à jour le profil utilisateur
      const response = await axios.put(
        "http://localhost:3001/api/v1/user/profile",
        profileData, // Données mises à jour du profil
        { headers: { Authorization: `Bearer ${token}` } } // Envoi du token dans les headers pour l'authentification
      );

      // Dispatch de l'action Redux pour mettre à jour le store avec les nouvelles données utilisateur
      dispatch(updateUserProfileSuccess(response.data.body));
    } catch (error) {
      // En cas d'erreur, affichage d'un message dans la console
      console.error("Failed to update user profile:", error);
    }
  };
