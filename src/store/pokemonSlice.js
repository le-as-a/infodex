import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {};

export const getPokemonById = createAsyncThunk(
    'pkmn/ABILITY_BY_ID',
    async (id) => {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

        if (res.ok) {
            const data = await res.json();
            return data;
        }
    }
)

export const pokemonSlice = createSlice({
    name: 'pokemon',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getPokemonById.fulfilled, (state, action) => {
            state.random = action.payload;
            return state;
        })
    }
})