import connectDb from "../../../../middleware/mongoose"
import Products from "../../../../models/Products"
import ProductsBeauty from "../../../../models/ProductsBeauty";
import ProductsBrand from "../../../../models/ProductsBrand";
import ProductsKids from "../../../../models/ProductsKids";
import ProductsWomen from "../../../../models/ProductsWomen";
export async function POST(req,res){
    try{
        await connectDb();
        let data=await req.json()
        let type=((data.data)['slug'])['fashion-name']
        data=(data.data)['product']['category']
        const k=[]
        let query=null;
        if (type=='men') {
            query = Products.find({ 'category':data});
        }
        else if (type=='women') {
            query = ProductsWomen.find({ 'category':data});
        }
        else if (type=='kids') {
            query = ProductsKids.find({ 'category':data});
        }
        else if (type=='beauty') {
            query = ProductsBeauty.find({ 'category':data});
        }
        else if (type=='brand') {
            query = ProductsBrand.find({ 'category':data});
        }
        query.select('title slug img category size color price quantity');
        let myproduct = await query.exec();
          
        return Response.json({status:true,myproduct},{status:200})
    }
    catch(error){
        return Response.json({status:false,error:error},{status:400})
    }

}
