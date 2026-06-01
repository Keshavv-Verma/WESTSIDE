import connectDb from "../../../../middleware/mongoose"
import Products from "../../../../models/Products"
import { NextResponse } from "next/server";
import ProductsWomen from "../../../../models/ProductsWomen";
import ProductsKids from "../../../../models/ProductsKids";
import ProductsBeauty from "../../../../models/ProductsBeauty";
import ProductsBrand from "../../../../models/ProductsBrand";
await connectDb();
let arr=[];
export async function GET(req,res){
    let products=await Products.find()
    let productsWomen=await ProductsWomen.find()
    let productsKids=await ProductsKids.find()
    let productsBeauty=await ProductsBeauty.find()
    arr=products.concat(productsWomen).concat(productsKids).concat(productsBeauty)
    return NextResponse.json({search:arr})
}
export async function POST(req,resp){
    let products=await Products.find()
    let productsWomen=await ProductsWomen.find()
    let productsKids=await ProductsKids.find()
    let productsBeauty=await ProductsBeauty.find()
    arr=products.concat(productsWomen).concat(productsKids).concat(productsBeauty)
    let {data}=await req.json();
   
    let res=[];
    try {
        // Using o(n^2) 😁😁😁😁 time Complexity But No Problem
        for (let i = 0; i < data.length; i++) {
            const query = data[i];
            for (let j = 0; j < arr.length; j++) {
                
                const element = arr[j];
                
                if (query.productId==element._id) {
                    res.push({title:element.title,price:element.price,img:element.img});
                }
            }
            
        }
        return NextResponse.json({success:true,"data":res},{status:200});
        
    } catch (except) {
        return NextResponse.json({success:false},{status:404});
    }

}
