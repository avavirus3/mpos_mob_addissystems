import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    draft: []
}

export const draftItemSlice = createSlice({
    name: 'draftItems',
    initialState,
    reducers: {
    }
});

export const { increment, decrement } = draftItemSlice.actions;

export default draftItemSlice.reducer;