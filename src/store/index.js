import { configureStore } from "@reduxjs/toolkit";
import { pokemonSlice } from "./pokemonSlice";
import { abilitySlice } from "./abilitySlice";
import { itemSlice } from "./itemSlice";

export const store = configureStore({
    reducer: {
        pokemon: pokemonSlice.reducer,
        ability: abilitySlice.reducer,
        item: itemSlice.reducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: false
      })
})