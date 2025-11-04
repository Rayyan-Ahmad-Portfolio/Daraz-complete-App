import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async ()=> {
    try {
        if(!process.env.MONGO_URI){
            throw new Error("Mongodb URI not found in the .env file");
        }
        await mongoose.connect(process.env.MONGO_URI, {dbName:"Daraz-App-Clone"});
    console.log("✅ MongoDB Connected Successfully");
    } catch (error) {
        console.error("❌ MongoDB Connection Failed:", error);
    process.exit(1); 
    }
} 