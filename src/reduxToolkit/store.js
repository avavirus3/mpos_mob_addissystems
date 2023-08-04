import { configureStore } from "@reduxjs/toolkit";
import counterReducer from './features/counter/counterSlice'
import productListReducer from './features/product/productListSlice'
import draftItemReducer from './features/draftItems/draftItemSlice'

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        product: productListReducer,
        draftItem: draftItemReducer
    }
})