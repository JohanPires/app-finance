import { configureStore } from "@reduxjs/toolkit";
import categorieSlice from "./slice/categorieSlice";

const store = configureStore({
  reducer: {
    categorie: categorieSlice,
  },
});

export default store;
