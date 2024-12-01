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
        getMyOrders: builder.query({
            query: ()=>({
                url:`${ORDERS_URL}/myorders`
            }),
            keepUnusedDataFor:5,
        }),
        getAllOrders: builder.query({
            query: ()=>({
                url:`${ORDERS_URL}/`
            }),
            keepUnusedDataFor:5,
        }),
        updateOrderToDelivered: builder.mutation({
            query: ({data,id})=>({
                url:`${ORDERS_URL}/${id}/delivered`,
                method:"PUT",
                body:data
            }),
        }),
        updatePaid: builder.mutation({
            query: (id) => ({
             url:`${ORDERS_URL}/${id}/pay`,
             method:"PUT"
            })
        }),
      
    })
})


export const  {useCreateOrderMutation,useGetOrderDetailsQuery,usePayOrderMutation,useGetMyOrdersQuery,useGetAllOrdersQuery,useUpdateOrderToDeliveredMutation,useUpdatePaidMutation} = orderApiSlice