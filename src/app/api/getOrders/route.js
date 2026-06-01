import connectDb from "../../../../middleware/mongoose"
import Orders from "../../../../models/Orders";
import Products from "../../../../models/Products"
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET(req,res){
    try {
        await connectDb();
        let orders=await Orders.find()
    
   
        return NextResponse.json({"orders":orders},{status:200})
    } catch (error) {
        if (!error.logged) {
            console.error("Unable to fetch orders:", error.message);
        }
        return NextResponse.json({"orders":[],"error":"Unable to fetch orders"},{status:500})
    }
}
