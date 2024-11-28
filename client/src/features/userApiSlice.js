import { USERS_URL } from "../constants";
import { apiSlice } from "./ApiSlice";



export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        Login: builder.mutation({
            query: (data) => ({
             url:`${USERS_URL}/login`,
             method:"POST",
             body:data
            })
        }),
        Register: builder.mutation({
            query: (data) => ({
             url:`${USERS_URL}/register`,
             method:"POST",
             body:data
            })
        }),
        LogOut: builder.mutation({
            query: () => ({
             url:`${USERS_URL}/logout`,
             method:"POST"
            })
        }),
    })
})


export const  {useLoginMutation,useRegisterMutation,useLogOutMutation} = userApiSlice