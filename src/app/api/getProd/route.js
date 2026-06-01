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
        data=data['id']
        const k=[]
            for(let i=0;i<data.length;i++){
                let value=(data[i])['value']
                let name=(data[i])['name']
                const type=name.split("_")[1]
                value=value.split('"');
                value=value[1];
                let query=0; 
                if (type=="men") {
                    query = Products.findOne({ '_id': value });  
                }
                if (type=="women") {
                    query = ProductsWomen.findOne({ '_id': value });  
                }
                if (type=="kids") {
                    query = ProductsKids.findOne({ '_id': value });  
                }
                if (type=="beauty") {
                    query = ProductsBeauty.findOne({ '_id': value });  
                }
                if (type=="brand") {
                    query = ProductsBrand.findOne({ '_id': value });  
                }
                query.select('title img category size color price quantity reviews');
                let myproduct = await query.exec();
                k.push(myproduct)
            }
        
        return Response.json({status:true,k},{status:200})
    }
    catch(error){
        return Response.json({status:false,error:error},{status:400})
    }

}
