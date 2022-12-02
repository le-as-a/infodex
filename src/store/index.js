import { configureStore } from "@reduxjs/toolkit";
import { pokemonSlice } from "./pokemonSlice";
import { abilitySlice } from "./abilitySlice";

export const store = configureStore({
    reducer: {
        pokemon: pokemonSlice.reducer,
        ability: abilitySlice.reducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: false
      })
})