import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {};

export const getItems = createAsyncThunk(
    'item/GET_ALL',
    async () => {
        const res = await fetch('https://pokeapi.co/api/v2/item?limit=994');
        if (res.ok) {
            const data = await res.json();
            const itemNames = []
            data.results.map(item => itemNames.push(item.name));
            return itemNames;
        }
    }
)

export const getItemInfo = createAsyncThunk(
    'item/GET_INFO',
    async (id) => {
        const res = await fetch(`https://pokeapi.co/api/v2/item/${id}`);
        if (res.ok) {
            const data = await res.json();
            let desc = '';
            for (let i = 0; i < data.flavor_text_entries.length; i++) {
                if (data.flavor_text_entries[i].language === 'en') desc = `${data.flavor_text_entries[i].text}`;
            }
            const itemInfo = {
                description: desc,
                name: data.name,
                img: data.sprites.default,
                cost: data.cost,
                category: data.category.name
            }
            return itemInfo;
        }
    }
)

export const itemSlice = createSlice({
    name: 'item',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getItems.fulfilled, (state, action) => {
            state.names = action.payload;
            return state;
        });
        builder.addCase(getItemInfo.fulfilled, (state, action) => {
            state.current = action.payload;
            return state;
        });
    }
})