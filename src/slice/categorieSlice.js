import { createSlice } from "@reduxjs/toolkit";

const categorieSlice = createSlice({
  name: "categorie",
  initialState: {
    categorieId: "alimentation",
  },
  reducers: {
    setcategorieId(state, action) {
      state.categorieId = action.payload;
    },
  },
});

export const { setcategorieId } = categorieSlice.actions;
export default categorieSlice.reducer;
