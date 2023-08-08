import { configureStore } from "@reduxjs/toolkit";
import counterReducer from './features/counter/counterSlice'
import productListReducer from './features/product/productListSlice'
import draftItemReducer from './features/draftItems/draftItemSlice'
import customersReducer from './features/customers/customersSlice'

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        product: productListReducer,
        draftItem: draftItemReducer,
        customerList: customersReducer
    }
})