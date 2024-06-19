import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()


const mongoDB_URL = process.env.MONGODB_URL
const connectDB = async(req,res)=>{
    try {
        const connection = mongoose.connect(mongoDB_URL)
        console.log("DB connected successfully")
        return connection
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"internal server error"})
    }
}


export default connectDB