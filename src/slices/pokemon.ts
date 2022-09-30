import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IPokemon, PokemonAbility } from "../pages/pokemons/type";

const initialState = {
  currentPage: 1,
};

export const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    changePage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
});

export const { changePage } = pokemonSlice.actions;

export default pokemonSlice.reducer;
