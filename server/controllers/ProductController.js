import Product from "../model/Product.js"
import asyncHandler from "../middleware/AsyncMiddleware.js"


const getProducts = asyncHandler(async (req,res)=>{
   const searchQ = req.query.search ? {title:{$regex:req.query.search, $options:'i'}} : {}
   const products = await Product.find({...searchQ})
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

const createProduct = asyncHandler(async (req,res)=>{
   const product = new Product({
      user: req.user._id,
      title: "Default Title",
      desc: "Default Description",
      category: "Default Category",
      imageSrc:"Default Src",
      imageAlt:"Default Alt",
      price: 0,
      countInStock: 0,
      rating: 0,
      reviewNum: 0
   })

   await product.save()
   return res.status(200).json("Product Created!")
})

const updateProduct = asyncHandler(async (req,res)=>{
const product = await Product.findById({_id:req.params.id})
if(!product){
   res.status(404)
   throw new Error("Resource Not Found!")
}
product.title = req.body.title || product.title;
product.desc = req.body.desc || product.desc;
product.category = req.body.category || product.category;
product.price = req.body.price || product.price;
product.countInStock = req.body.countInStock || product.countInStock;
product.imageSrc = req.body.imageSrc || product.imageSrc
product.save()
return res.status(200).json("Updated Successfully!")

})


export {getProducts,getProductbyId,deleteProduct,updateProduct,createProduct}