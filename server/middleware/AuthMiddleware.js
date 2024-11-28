import jwt from "jsonwebtoken"
import User from "../model/User.js";
import asyncHandler from "./AsyncMiddleware.js";


const protect = asyncHandler(async (req, res, next) => {
    let token;
    token = req.cookies.jwt
    if (token) {
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decode.id).select("-password")
            next()
        } catch (error) {
            res.status(400)
            throw new Error("Invalid Token!")
        }

    } else {
        res.status(400)
        throw new Error("No Token, Not Authorized!")
    }
})


const admin = asyncHandler(async (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next()
    } else {
        res.status(400)
        throw new Error("Not Authrozied as Admin!")
    }
})







export { protect, admin }