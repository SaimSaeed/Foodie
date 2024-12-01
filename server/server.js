import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors"
import productRoutes from "./routes/productRoutes.js"
import authRoutes from "./routes/authRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"
import { notFound, errorHandler } from "./middleware/ErrorMiddleware.js"
import cookieParser from "cookie-parser"
dotenv.config()

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Database is Running!")
    })
    .catch((error) => {
        console.log(error)
    })

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
const corsOptions = {
    origin: "http://localhost:3000",  // Replace this with the correct port if different
    credentials: true,  // Allow credentials like cookies
    optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use("/api/products", productRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/orders", orderRoutes)
// app.get("/api/stripe",async (req,res)=>{
//    const client_secret = {clientSecret:process.env.CLIENT_ID}
//    return res.status(200).json(client_secret)
// })


app.use(notFound)
app.use(errorHandler)


const port =  process.env.PORT || 8000
app.listen(port, () => {
    console.log("Server is Running!", port)
})

