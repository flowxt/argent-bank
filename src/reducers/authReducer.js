import { createSlice } from "@reduxjs/toolkit"; // importation de createSlice de Redux Toolkit pour gérer l'etat de l'authentification

// Définition de l'état initial de l'authentification
const initialState = {
  isAuthenticated: false, // Indique si l'utilisateur est connecté ou non
  firstName: "", // Prénom de l'utilisateur
  lastName: "", // Nom de l'utilisateur
  token: null, // Token d'authentification de l'utilisateur
};

// Création du slice Redux pour l'authentification
const authSlice = createSlice({
  name: "auth", // Nom du slice (je vais l'utiliser pour l'organisation dans Redux)
  initialState, // État initial défini ci-dessus
  reducers: {
    // Action appelée lors d'une connexion réussie
    loginSuccess: (state, action) => {
      state.isAuthenticated = true; // L'utilisateur est connecté
      state.firstName = action.payload.firstName; // Stockage du prénom
      state.lastName = action.payload.lastName; // Stockage du nom
      state.token = action.payload.token; // Stockage du token
    },
    // Action appelée lors de la déconnexion
    logout: (state) => {
      state.isAuthenticated = false; // L'utilisateur n'est plus connecté
      state.firstName = ""; // Remise à zéro du prénom
      state.lastName = ""; // Remise à zéro du nom
      state.token = null; // Remise à zéro du token
    },
    // Action appelée lors de la mise à jour du profil utilisateur
    updateUserProfileSuccess: (state, action) => {
      state.firstName = action.payload.firstName; // Mise à jour du prénom
      state.lastName = action.payload.lastName; // Mise à jour du nom
    },
  },
});

// Exportation des actions pour pouvoir les utiliser ailleurs dans l'application
export const { loginSuccess, logout, updateUserProfileSuccess } =
  authSlice.actions;
// Exportation du reducer pour qu'il soit utilisé dans le store Redux
export default authSlice.reducer;
