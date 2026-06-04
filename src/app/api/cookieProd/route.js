import { cookies, headers } from "next/headers";
import { jwtVerify } from 'jose';

export async function POST(req,res){
    let tokenData = await req.json();
    try {
        let token = tokenData?.token;
        
        if (!token) {
            return Response.json({"success":false,data:null},{status:401})
        }

        if (!process.env.JWT_SECRET) {
            return Response.json({"success":false,data:null,error:"JWT_SECRET not configured"},{status:500})
        }

        // CRITICAL FIX: Single JWT verification method using jose
        const {payload} = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
        
        return Response.json({
            "success":true,
            "data":{
                name: payload.name,
                email: payload.email,
                exp: payload.exp,
                iat: payload.iat,
                nbf: payload.nbf,
            }
        },{status:200})
        
    } catch (error) {
        console.error('Token verification error:', error.message);
        return Response.json({
            "success":false,
            "data":null,
            "error": "Invalid or expired token"
        },{status:401})
    }
}
