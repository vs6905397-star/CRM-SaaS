import "dotenv/config";
import express from "express"
import dotenv from "dotenv"

dotenv.config()

import cookieParser from "cookie-parser"
import connectDb from "./config/connectDb.js"
import authRoutes from "./routes/authRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import customerRoutes from "./routes/customerRoutes.js"
import taskRoutes from "./routes/taskRoutes.js"
import deshboardRoutes from "./routes/deshboardRoutes.js"

import cors from "cors"
import path from "path"

const app = express()
app.use(cors({
    origin: "https://crm-saas-frontend.onrender.com/api",
    credentials:true
}));

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

connectDb();

app.use("/api", authRoutes)
app.use("/api/user", userRoutes)
app.use("/api/customer", customerRoutes)
app.use("/api/task", taskRoutes)
app.use("/api/deshboard", deshboardRoutes)

app.listen(5000);