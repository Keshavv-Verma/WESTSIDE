import connectDb from "../../../../middleware/mongoose"
import Products from "../../../../models/Products"
import { NextResponse } from "next/server";
export async function POST(request,response){
    try{

        let make=await request.json()
        await connectDb();
        let p=new Products({
            title:make.title,
            slug:make.slug,
            desc:make.desc,
            img:make.img,
            category:make.category,
            reviews:make.reviews,
            size:make.size,
            color:make.color,
            price:make.price,
            quantity:make.quantity
        })
        await p.save();
        return Response.json({success:true})
    }catch(error){
        return Response.json({success:false})
    }
        
        
    }
