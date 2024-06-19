import mongoose from "mongoose";
import express from "express";
import dotenv from 'dotenv'
import cors from "cors"
import router from "./Routers/studentMentorRouter.js"
import connectDB from "./Database/config.js";

dotenv.config()
const app = express()
connectDB()
app.use(express.json())
app.use(cors())
app.use("/api",router)
app.get("/",(req,res)=>{
    res.status(200).send("Bonjour")
})
app.listen(process.env.PORT,()=>{
    console.log("Iam listening on", process.env.PORT)
})