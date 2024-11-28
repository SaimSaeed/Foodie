import {configureStore} from "@reduxjs/toolkit"
import { apiSlice } from "../features/ApiSlice";
import cartSlice from "../features/cartSlice ";
import authSlice from "../features/authSlice";


const store = configureStore({

reducer:{
    [apiSlice.reducerPath]:apiSlice.reducer,
    cart:cartSlice,
    auth:authSlice,


},
middleware:(getDefaultMiddleware)=> getDefaultMiddleware().concat(apiSlice.middleware),
devTools:true
})
export default store;