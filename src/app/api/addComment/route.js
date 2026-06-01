import connectDb from "../../../../middleware/mongoose";
import Products from "../../../../models/Products";
import ProductsBeauty from "../../../../models/ProductsBeauty";
import ProductsBrand from "../../../../models/ProductsBrand";
import ProductsKids from "../../../../models/ProductsKids";
import ProductsWomen from "../../../../models/ProductsWomen";

export async function POST(req,res) {
    let query=await req.json();
    await connectDb();
    let query1=0;
    if(query.type=="men"){
        
         query1=Products.updateOne(
            { _id: query._id},
            { "$push": { "reviews": {"useremail":query.email,"rating":query.rating,"feedback":query.feedback} } });
        }
        if(query.type=="women"){
            
            query1=ProductsWomen.updateOne(
                { _id: query._id},
                { "$push": { "reviews": {"useremail":query.email,"rating":query.rating,"feedback":query.feedback} } });
            }
            if(query.type=="kids"){
                
                query1=ProductsKids.updateOne(
                    { _id: query._id},
                    { "$push": { "reviews": {"useremail":query.email,"rating":query.rating,"feedback":query.feedback} } });
        }
        if(query.type=="beauty"){
            
            query1=ProductsBeauty.updateOne(
                { _id: query._id},
                { "$push": { "reviews": {"useremail":query.email,"rating":query.rating,"feedback":query.feedback} } });
        }
    if(query.type=="brand"){
        
        query1=ProductsBrand.updateOne(
            { _id: query._id},
            { "$push": { "reviews": {"useremail":query.email,"rating":query.rating,"feedback":query.feedback} } });
        }
        const k=await query1.exec();
        return Response.json({success:true,"data":k},{status:200})
        
    }
