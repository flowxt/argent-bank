// J'importe la fonction createSlice de Redux Toolkit.
import { createSlice } from "@reduxjs/toolkit";

// Ici j'ai mon etat initial du slice auth
const initialState = {
  isAuthenticated: false, // Ici je définis que l'utilisateur n'est pas connecté par défaut
  firstName: "", // Ici je définis le prénom de l'utilisateur
  lastName: "", // Ici je définis le nom de l'utilisateur
};

// creation du slice auth avec createSlice
const authSlice = createSlice({
  name: "auth", // nom du slice
  initialState, // etat initial
  reducers: {
    // Réducteur pour gérer le succès de la connexion
    loginSuccess: (state, action) => {
      state.isAuthenticated = true; // ici je définis que l'utilisateur est connecté
      state.firstName = action.payload.firstName; // Met à jour le prénom de l'utilisateur
      state.lastName = action.payload.lastName; // Met à jour le nom de l'utilisateur
    },
    // Je vais gérer la deconnexion de l'utilisateur avec mon reducteur
    logout: (state) => {
      state.isAuthenticated = false; // Je réinitialise l'authentification de l'utilisateur
      state.firstName = ""; // réinitialise le prénom de l'utilisateur
      state.lastName = ""; // réinitialise le nom de l'utilisateur
    },
    // Réducteur pour gérer la mise à jour du profil utilisateur
    updateUserProfileSuccess: (state, action) => {
      state.firstName = action.payload.firstName; // Met à jour le prénom de l'utilisateur
      state.lastName = action.payload.lastName; // met à jour le nom de l'utilisateur
    },
  },
});

// J'exporte les actions de mon slice auth
export const { loginSuccess, logout, updateUserProfileSuccess } =
  authSlice.actions;
// J'exporte le reducer par defaut
export default authSlice.reducer;
