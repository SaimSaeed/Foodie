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
            })
        }),
        getUsers: builder.query({
            query: () => ({
             url:`${USERS_URL}/`,
            }),
            keepUnusedDataFor:5
        }),
        deleteUsers: builder.mutation({
            query: (id) => ({
             url:`${USERS_URL}/${id}`,
             method:"DELETE"
            }),
        }),
        getUser: builder.query({
            query: (id) => ({
             url:`${USERS_URL}/${id}`,
            }),
            keepUnusedDataFor:5
        }),
        updateUserById: builder.mutation({
            query: ({data,id}) => ({
             url:`${USERS_URL}/${id}`,
             method:"PUT",
             body:data
            }),
        }),
    })
})


export const  {useLoginMutation,useRegisterMutation,useLogOutMutation,useUpdateUserMutation,useGetUsersQuery,useDeleteUsersMutation,useGetUserQuery,useUpdateUserByIdMutation} = userApiSlice