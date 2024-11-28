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
        updateUser: builder.mutation({
            query: (data) => ({
             url:`${USERS_URL}/profile`,
             method:"PUT",
             body:data
            }),
            keepUnusedDataFor:5
        }),
    })
})


export const  {useLoginMutation,useRegisterMutation,useLogOutMutation,useUpdateUserMutation} = userApiSlice