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

export const getAbilityInfo = createAsyncThunk(
    'ability/GET_INFO',
    async (id) => {
        const res = await fetch(`https://pokeapi.co/api/v2/ability/${id}`);
        if (res.ok) {
            const data = await res.json();
            const pkmnNames = data.pokemon.map(pkmn => {
                return pkmn.pokemon.name;
            })
            const abilityInfo = {
                name: data.name,
                description: data.effect_entries,
                gen: data.generation.name,
                pokemon: pkmnNames
            }
            return abilityInfo;
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
        });
        builder.addCase(getAbilityInfo.fulfilled, (state, action) => {
            state.current = action.payload;
            return state;
        });
    }
})