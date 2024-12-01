import asyncHandler from "../middleware/AsyncMiddleware.js"
import Order from "../model/Order.js"
import dotenv from "dotenv"
dotenv.config()
import Stripe from "stripe"
const stripe = new Stripe(process.env.CLIENT_ID)

// Get Orders for User
const getUserOrders = asyncHandler(async (req,res)=>{
   const orders = await Order.find({user:req.user._id})
   if(!orders){
    res.status(404)
    throw new Error("Resource Not Found!")
   }
   return res.status(200).json(orders)
})

const getAdminOrders = asyncHandler(async (req,res)=>{
  const orders = await Order.find({})
  if(!orders){
    res.status(404)
    throw new Error("Resource Not Found!")
  }
  return res.status(200).json(orders)
})


// get Order by ID
const getOrderById = asyncHandler(async(req,res)=>{
  const order = await Order.findById(req.params.id).populate('user','username email')
  if(order){
   res.status(200).json(order)
  }else{
   res.status(404)
   throw new Error("Resource Not Found!")
  }
 })



// Create Order
const createOrder = asyncHandler(async (req,res)=>{
  const {
    orderItems,
    shippingDetails,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice
  } = req.body

  if(orderItems && orderItems.length === 0 ){
    res.status(404)
    throw new Error("No Order Items!")
  }else{
    const order = new Order({
        user:req.user._id,
        orderItems:orderItems.map((x)=>({...x,product:x._id,_id:undefined})),
        shippingDetails,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice
    })

    const saveOrder = await order.save()
    res.status(201).json(saveOrder)
  }
})



// Updated Order to Paid
const updateOrderToPaid = asyncHandler(async(req,res)=>{
  // Fetching Order to update it
  const order = await Order.findById(req.params.id)
  if(!order){
    res.status(404)
    throw new Error("Resource Not Found!")
  }

//    // creating customer
//    const customer = await stripe.customers.create({
//     email: token.email,
//     source: token.id
// })
  // Creating Payment Intent
  const intent = await stripe.paymentIntents.create({
    amount:order.totalPrice * 100,
    currency: 'usd',
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {enabled:true}
  })

  if(intent && order){
    order.isPaid = true;
    order.paidAt=Date.now();
    order.paymentResult = {
      id: intent.id,
      status:intent.status,
      update_time: Date.now()
    }
    order.save()
  }
 

  return res.status(200).json({client_secret: intent.client_secret})

})


const updateOrderToDelivered = asyncHandler(async (req,res)=>{
   const order = await Order.findById({_id:req.params.id})
   if(!order){
    res.status(404)
    throw new Error("Resource Not Found!")
   }
   order.isDelivered = Boolean(req.body.isDelivered)
   order.deliveredAt= Date.now()
   order.save()
})

const updateOrderToPaidByAdmin = asyncHandler(async (req,res)=>{
 const order = await Order.findById({_id:req.params.id})
 if(!order){
 res.status(404)
 throw new Error("Resource Not Found!")
 }
 order.isPaid = true;
 order.paidAt= Date.now()
 order.save()
})



















export {createOrder,getOrderById,updateOrderToPaid,getUserOrders,getAdminOrders,updateOrderToDelivered,updateOrderToPaidByAdmin}