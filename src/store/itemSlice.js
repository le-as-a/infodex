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

export const itemSlice = createSlice({
    name: 'item',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getItems.fulfilled, (state, action) => {
            state.names = action.payload;
            return state;
        })
    }
})