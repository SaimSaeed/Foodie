import express from "express"
import { createOrder, getOrderById, updateOrderToPaid } from "../controllers/OrderController.js"
import {protect} from "../middleware/AuthMiddleware.js"
const router = express.Router()


router.route("/").post(protect,createOrder)
router.route("/:id").get(protect,getOrderById)
router.route("/:id/pay").post(protect,updateOrderToPaid)












export default router