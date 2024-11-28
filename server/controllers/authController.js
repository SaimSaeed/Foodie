import asyncHandler from "../middleware/AsyncMiddleware.js";
import User from "../model/User.js"
import jwt from "jsonwebtoken"
const Login = asyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
        res.status(400)
        throw new Error("Wrong Credentials!")
    }
    if (!(await user.matchPassword(req.body.password))) {
        res.status(400)
        throw new Error("Wrong Credentials!")
    }
    const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "30d"
    })

    res.cookie("jwt", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000
    })

    return res.status(200).json({
        id: user._id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin

    })



})


const Register = asyncHandler(async (req, res) => {
    const existingUser = await User.findOne({ username: req.body.username })
    if (existingUser) {
        res.status(400)
        throw new Error("User is Already Registered!")
    }
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })

    const saveUser = await user.save()
    if (saveUser) {
        const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "30d"
        })

        res.cookie("jwt", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            sameSite: "strict",
            maxAge: 30 * 24 * 60 * 60 * 1000
        })

        return res.status(200).json({
            id: user._id,
            username: user.username,
            email: user.email,
            isAdmin: user.isAdmin

        })
    } else {
        res.status(400)
        throw new Error("Invalid User Data!")
    }


})


const LogOut = asyncHandler(async (req, res) => {
    res.cookie("jwt", "", {
        httpOnly: true,
        maxAge: new Date(0)
    })
    res.status(200).json("Logged Out Successfully!")
})

const getUserProfile = asyncHandler(async (req, res) => {
    // const user = await User.findById(req.user._id).select("-password")
    // if (user){
    //     res.status(200).json({ user })
    // }else{
    //     res.status(404)
    //     throw new Error("User Not Found!")
    // }
    res.send("Profile Suceesful!")
})














export { Login, Register, LogOut,getUserProfile }