import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {};

export const getAbilities = createAsyncThunk(
    'ability/GET_ALL',
    async () => {
        const res = await fetch('https://pokeapi.co/api/v2/ability?limit=999');

        if (res.ok) {
            const data = await res.json();
            const abilityNames = []
            data.results.map(ability => abilityNames.push(ability.name));
            return abilityNames;
        }
    }
)

export const abilitySlice = createSlice({
    name: 'ability',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getAbilities.fulfilled, (state, action) => {
            state.names = action.payload;
            return state;
        })
    }
})