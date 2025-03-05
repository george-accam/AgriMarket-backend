import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const MONGODB_URL = process.env.MONGODB_URL;

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(MONGODB_URL);
        console.log(`MongoDB connection successfully established ${conn.connection.host}`);
    } catch (error) {
        console.error("MongoDB connection fail" + error);
        process.exit(1);
    }
};