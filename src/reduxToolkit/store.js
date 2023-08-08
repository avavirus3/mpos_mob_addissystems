import { configureStore } from "@reduxjs/toolkit";
import productListReducer from './features/product/productListSlice'
import draftItemReducer from './features/draftItems/draftItemSlice'

export const store = configureStore({
    reducer: {
        product: productListReducer,
        draftItem: draftItemReducer
    }
})