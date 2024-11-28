import { PRODUCTS_URL } from "../constants";
import { apiSlice } from "./ApiSlice";



export const productApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getproducts: builder.query({
            query: () => ({
             url:`${PRODUCTS_URL}/`
            }),
            keepUnusedDataFor: 5
        }),
        getproduct: builder.query({
            query: (id) => ({
             url:`${PRODUCTS_URL}/${id}`
            }),
            keepUnusedDataFor: 5
        })

    })
})


export const  {useGetproductsQuery,useGetproductQuery} = productApiSlice