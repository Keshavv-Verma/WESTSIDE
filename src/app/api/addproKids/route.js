import connectDb from "../../../../middleware/mongoose"
import Products from "../../../../models/Products"
import { NextResponse } from "next/server";
import ProductsKids from "../../../../models/ProductsKids";
export async function POST(request,response){
    try{

        let make=await request.json()
        await connectDb();
        let p=new ProductsKids({
            title:make.title,
            slug:make.slug,
            reviews:make.reviews,
            desc:make.desc,
            img:make.img,
            category:make.category,
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
