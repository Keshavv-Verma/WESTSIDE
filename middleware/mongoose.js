import mongoose from "mongoose";

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

const connectDb=async()=>{
    const uri = process.env.MONGO_URI || process.env.NEXT_PUBLIC_MONGO_URI;

    if (!uri) {
        throw new Error("MongoDB connection string is missing");
    }

    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        mongoose.set("bufferCommands", false);
        cached.promise = mongoose.connect(uri, {
            serverSelectionTimeoutMS: 5000,
        });
    }

    try {
        cached.conn = await cached.promise;
        cached.lastErrorMessage = null;
        return cached.conn;
    } catch (error) {
        cached.promise = null;

        if (cached.lastErrorMessage !== error.message) {
            console.error("MongoDB connection failed:", error.message);
            cached.lastErrorMessage = error.message;
        }

        error.logged = true;
        throw error;
    }
    
}
export default connectDb
