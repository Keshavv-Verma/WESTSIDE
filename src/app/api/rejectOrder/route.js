import connectDb from "../../../../middleware/mongoose"
import Orders from "../../../../models/Orders"
import { jwtVerify } from 'jose';
import { NextResponse } from "next/server";

export async function POST(req,res) {
    try {
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

        await connectDb();
        let {query}=await req.json();
        
        // CRITICAL FIX: Verify the order belongs to the authenticated user before deleting
        const orderToDelete = await Orders.findOne({OrderId: query});
        if (!orderToDelete) {
            return NextResponse.json({success:false, error: "Order not found"},{status:404});
        }
        if (orderToDelete.userEmail !== authenticatedEmail) {
            return NextResponse.json({success:false, error: "Unauthorized - Cannot reject other users' orders"},{status:403});
        }

        let k=Orders.deleteOne({OrderId:query});
        await k.exec();
        return NextResponse.json({"success":true},{status:200});
    } catch (error) {
        console.error('rejectOrder error:', error);
        return NextResponse.json({success:false, error: error.message},{status:500});
    }
}
