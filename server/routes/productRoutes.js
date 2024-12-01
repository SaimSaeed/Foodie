import express from "express"
import { deleteProduct, getProductbyId, getProducts } from "../controllers/ProductController.js"
import { admin, protect } from "../middleware/AuthMiddleware.js"
const router = express.Router()


router.route("/").get(getProducts)
router.route("/:id").get(getProductbyId).delete(protect,admin,deleteProduct)



export default router