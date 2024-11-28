import Product from "../model/Product.js"
import asyncHandler from "../middleware/AsyncMiddleware.js"


const getProducts = asyncHandler(async (req,res)=>{
const products = await Product.find()
res.status(200).json(products)
})

const getProductbyId = asyncHandler(async (req,res)=>{
 const product = await Product.findById(req.params.id)
 if(product){
    res.status(200).json(product)
 }else{
    res.status(404)
    throw new Error("Resource Not Found!")
 }
})

export {getProducts,getProductbyId}