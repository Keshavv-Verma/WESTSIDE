import connectDb from "../../../../middleware/mongoose"
import Orders from "../../../../models/Orders";
import Products from "../../../../models/Products"
import { NextResponse } from "next/server";
export async function GET(req,res){
    await connectDb();
    let orders=await Orders.find()
    
   
    return NextResponse.json({"orders":orders},{status:200})
}