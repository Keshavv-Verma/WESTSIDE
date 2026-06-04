import connectDb from "../../../../middleware/mongoose"
import Orders from "../../../../models/Orders";
import { jwtVerify } from 'jose';
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET(req,res){
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
                    { success: false, orders: [], error: 'Unauthorized - Invalid token' },
                    { status: 401 }
                );
            }
        } else {
            return NextResponse.json(
                { success: false, orders: [], error: 'Unauthorized - No token provided' },
                { status: 401 }
            );
        }

        await connectDb();
        // CRITICAL FIX: Only fetch orders for authenticated user
        let orders = await Orders.find({ userEmail: authenticatedEmail })
   
        return NextResponse.json({"orders":orders, "success": true},{status:200})
    } catch (error) {
        if (!error.logged) {
            console.error("Unable to fetch orders:", error.message);
        }
        return NextResponse.json({"orders":[],"error":"Unable to fetch orders", "success": false},{status:500})
    }
}
