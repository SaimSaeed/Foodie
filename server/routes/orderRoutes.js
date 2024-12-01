import express from "express"
import { createOrder, getAdminOrders, getOrderById, getUserOrders, updateOrderToDelivered, updateOrderToPaid, updateOrderToPaidByAdmin } from "../controllers/OrderController.js"
import {protect,admin} from "../middleware/AuthMiddleware.js"
const router = express.Router()


router.route("/").post(protect,createOrder).get(protect,admin,getAdminOrders)
router.route("/myorders").get(protect,getUserOrders)
router.route("/:id").get(protect,getOrderById)
router.route("/:id/delivered").put(protect,admin,updateOrderToDelivered)
router.route("/:id/pay").post(protect,updateOrderToPaid).put(protect,admin,updateOrderToPaidByAdmin)














export default router