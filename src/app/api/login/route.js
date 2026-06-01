import {SignJWT, jwtVerify} from 'jose';
import connectDb from "../../../../middleware/mongoose"
import User from "../../../../models/User"
var CryptoJS = require("crypto-js");
const jwt=require('jsonwebtoken')
export async function POST(req,res){
    try{

        let {email,password}=await req.json()
        //connecting with mongodb
        await connectDb();
        // Finding my query

        const query = User.findOne({ 'email': email });
            // selecting the `name` and `occupation` fields
            query.select('email password name');
            // execute the query at a later time
            const userData = await query.exec();
            var bytes  = CryptoJS.AES.decrypt(userData.password,process.env.CRYPTO_SECRET);
            var originalpass = bytes.toString(CryptoJS.enc.Utf8);
            if (originalpass===password) {
                const token=await sign({email:userData.email,name:userData.name},process.env.JWT_SECRET)
              
              return Response.json({success:true,token},{status:200})
            }
            
            else{
                return Response.json({success:false},{status:200})

            }
            
    }
    catch(error){
        return Response.json({status:false},{status:400})
    }

}
async function sign(payload, secret) {
    const iat = Math.floor(Date.now() / 1000);
    const exp = iat + 60 * 100; // one hour

    return new SignJWT({ ...payload })
        .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
        .setExpirationTime(exp)
        .setIssuedAt(iat)
        .setNotBefore(iat)
        .sign(new TextEncoder().encode(secret));
}
