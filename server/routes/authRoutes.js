import express from "express"
import { Login, Register,LogOut, getUserProfile } from "../controllers/authController.js"
import { protect } from "../middleware/AuthMiddleware.js"
const router = express.Router()

router.post("/login",Login)
router.post("/register",Register)
router.post("/logout",LogOut)
router.route("/profile").get(protect,getUserProfile)







export default router