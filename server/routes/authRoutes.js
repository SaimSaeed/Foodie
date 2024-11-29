import express from "express"
import { Login, Register,LogOut, updateUserProfile, getUsers, deleteUsers, getUserById } from "../controllers/authController.js"
import { protect,admin } from "../middleware/AuthMiddleware.js"
const router = express.Router()

router.route("/").get(protect,admin,getUsers)
router.route("/:id").get(protect,admin,getUserById).delete(protect,admin,deleteUsers)
router.post("/login",Login)
router.post("/register",Register)
router.post("/logout",LogOut)
router.route("/profile").put(protect,updateUserProfile)







export default router