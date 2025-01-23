// J'importe la fonction configureStore de Redux Toolkit.
import { configureStore } from "@reduxjs/toolkit";
// importation de reducteur auth
import authReducer from "./reducers/authReducer";

// Configuration du store Redux
const store = configureStore({
  reducer: {
    auth: authReducer, // Ajout du reducteur auth du store
  },
});

// J'exporte mon store configuré
export default store;
