import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("foodCart") ? JSON.parse(localStorage.getItem("foodCart")) : { cartItems: [], shippingDetails: {}, paymentMethod: {} }

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addCartItems: (state, action) => {
            const item = action.payload
            const existingItem = state.cartItems.find(x => x._id === item._id)
            if (existingItem) {
                state.cartItems = state.cartItems.map(x => x._id === existingItem._id ? item : x)
            } else {
                state.cartItems = [...state.cartItems, item]
            }
            state.itemsPrice = state.cartItems.reduce((acc, item) => acc += item.price * item.qty, 0)
            state.shippingPrice = Number(state.itemsPrice > 100 ? 0 : 10).toFixed(2)
            // 15% tax
            state.taxPrice = Number(0.15 * state.itemsPrice).toFixed(2)
            state.totalPrice = (Number(state.itemsPrice) + Number(state.shippingPrice) + Number(state.taxPrice)).toFixed(2)
            localStorage.setItem("foodCart", JSON.stringify(state))

        },
        removeFromCart: (state, action) => {
            const id = action.payload
            state.cartItems = state.cartItems.filter((item) => item._id !== id)
            localStorage.setItem("foodCart", JSON.stringify(state))
        },
        incrementQty: (state, action) => {
            const id = action.payload
            const item = state.cartItems.find(x => x._id === id)
            if (item && item.qty < item.countInStock) {
                item.qty = item.qty + 1
                localStorage.setItem("foodCart", JSON.stringify(state))

            }

        },
        decrementQty: (state, action) => {
            const id = action.payload
            const item = state.cartItems.find(x => x._id === id)
            if (item && item.qty !== 1) {
                item.qty = item.qty - 1
                localStorage.setItem("foodCart", JSON.stringify(state))

            }
        },
        addShippingDetails: (state, action) => {
            state.shippingDetails = action.payload
            localStorage.setItem("foodCart", JSON.stringify(state))

        },
        addPaymentMethod: (state, action) => {
            state.paymentMethod = action.payload
            localStorage.setItem("foodCart", JSON.stringify(state))
        },
        clearallCart: (state,action)=>{
         state.cartItems = []
         localStorage.setItem("foodCart", JSON.stringify(state))
        }

    }
})

export const { addCartItems, removeFromCart, incrementQty, decrementQty, addShippingDetails,addPaymentMethod,clearallCart } = cartSlice.actions



export default cartSlice.reducer