import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IPokemon, Ipokemons } from "../pages/pokemons/type";

export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2/" }),
  endpoints: (builder) => ({
    getPokemonByName: builder.query<IPokemon, string>({
      query: (name: string) => {
        console.log("name", name);
        return `pokemon/${name}`;
      },
    }),
  }),
});

// Export hooks for usage in functional components
export const { useGetPokemonByNameQuery } = pokemonApi;
