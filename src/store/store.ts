import { configureStore } from "@reduxjs/toolkit";
import pokemon from "../slices/pokemon";

import { pokemonApi } from "../services/pokemon";

export const store = configureStore({
  reducer: {
    pokemon,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware),
});

export type RootStore = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
