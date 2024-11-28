import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import { BASE_URL } from "../constants"

const baseQuery = fetchBaseQuery({baseUrl:BASE_URL,credentials:"include"})
export const apiSlice = createApi({
    baseQuery,
    // tagtypes are labels for the data collection 
    tagTypes:["Product","Order","User"],
    endpoints: builder=>({
//    Endpoints will be injected to this parent apiSlice by children slices
    })
})