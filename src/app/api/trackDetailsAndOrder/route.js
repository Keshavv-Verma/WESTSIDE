import connectDb from "../../../../middleware/mongoose"
import Orders from "../../../../models/Orders"
import Products from "../../../../models/Products"
import { jwtVerify } from 'jose';
import { NextResponse } from "next/server";

export async function POST(req,res){
    try{
        // CRITICAL FIX: Verify authentication token
        const token = req.cookies?.get('token')?.value;
        let authenticatedEmail = null;

        if (token && process.env.JWT_SECRET) {
            try {
                const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
                authenticatedEmail = payload.email;
            } catch (tokenError) {
                return NextResponse.json(
                    { success: false, error: 'Unauthorized - Invalid token' },
                    { status: 401 }
                );
            }
        } else {
            return NextResponse.json(
                { success: false, error: 'Unauthorized - No token provided' },
                { status: 401 }
            );
        }

        const {orderId} = await req.json(); 
        await connectDb();
        
        // CRITICAL FIX: Verify the order belongs to the authenticated user
        const myuser = await Orders.findOne({OrderId:orderId});
        if (!myuser) {
            return NextResponse.json({status:false, error: "Order not found"},{status:404});
        }
        if (myuser.userEmail !== authenticatedEmail) {
            return NextResponse.json({status:false, error: "Unauthorized - Cannot access other users' orders"},{status:403});
        }

        const arrPrd=[]
        myuser.select('userEmail products amount status');
        
        for(let i=0;i<myuser['products'].length;i++){
            const findPdr=Products.findOne({_id:((myuser['products'])[i])['productId']});
            findPdr.select('title price');
            const mypdr = await findPdr.exec();
            arrPrd.push(mypdr);
        }
        return NextResponse.json({status:true,productInfo:arrPrd,userInfo:myuser},{status:200})
    }
    catch(error){
        console.error('trackDetailsAndOrder error:', error);
        return NextResponse.json({status:false, error: error.message},{status:500})
    }
}
