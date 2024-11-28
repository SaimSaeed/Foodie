import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    user: localStorage.getItem("foodieUser") ? JSON.parse(localStorage.getItem("foodieUser")) : null
  }

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.user = action.payload
            localStorage.setItem("foodieUser",JSON.stringify(action.payload))
        },
        logOut: (state) => {
            state.user = null
            localStorage.removeItem("foodieUser")
        }
    }
})


export const { setCredentials, logOut } = authSlice.actions
export default authSlice.reducer