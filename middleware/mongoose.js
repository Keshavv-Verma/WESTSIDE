import mongoose from "mongoose";
const connectDb=async()=>{
    try{

        await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URI)
    }
    catch(error){
    }
    
}
export default connectDb
