import express from "express"
import { createOrder, getAdminOrders, getOrderById, getUserOrders, updateOrderToPaid } from "../controllers/OrderController.js"
import {protect,admin} from "../middleware/AuthMiddleware.js"
const router = express.Router()


router.route("/").post(protect,createOrder).get(protect,admin,getAdminOrders)
router.route("/myorders").get(protect,getUserOrders)
router.route("/:id").get(protect,getOrderById)
router.route("/:id/pay").post(protect,updateOrderToPaid)













export default router