import { ORDERS_URL } from "../constants";
import { apiSlice } from "./ApiSlice";



export const orderApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        createOrder: builder.mutation({
            query: (data) => ({
             url:`${ORDERS_URL}/`,
             method:"POST",
             body:data
            })
        }),
        getOrderDetails: builder.query({
            query: (id)=>({
                url:`${ORDERS_URL}/${id}`
            }),
            keepUnusedDataFor:5,
        }),
        payOrder: builder.mutation({
            query: (id) => ({
             url:`${ORDERS_URL}/${id}/pay`,
             method:"POST"
            })
        }),
        // getClientID: builder.query({
        //     query: ()=>({
        //         url:`/api/stripe`
        //     }),
        //     keepUnusedDataFor:5
        // }),
        //  getPublishableKey: builder.query({
        //     query: ()=>({
        //         url:`/api/config`
        //     }),
        //     keepUnusedDataFor:5
        // }),
      
    })
})


export const  {useCreateOrderMutation,useGetOrderDetailsQuery,usePayOrderMutation} = orderApiSlice