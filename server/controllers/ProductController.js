import Product from "../model/Product.js"
import asyncHandler from "../middleware/AsyncMiddleware.js"


const getProducts = asyncHandler(async (req,res)=>{
   const products = await Product.find({})
   if(!products){
    res.status(404)
    throw new Error("Resource Not Found!")
   }
   return res.status(200).json(products)
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

const deleteProduct = asyncHandler(async (req,res)=>{
  const product = await Product.findById({_id:req.params.id})
  if(!product){
   res.status(404)
   throw new Error("Resource Not Found!")
  }
  await product.deleteOne()
  return res.status(202).json("Deleted Successfully!")

})


export {getProducts,getProductbyId,deleteProduct}