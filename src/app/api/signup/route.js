import connectDb from "../../../../middleware/mongoose"
import User from "../../../../models/User"
import { SignJWT } from 'jose';
var CryptoJS = require("crypto-js");

let POST = async (request, response) => {
    try {
        let make = await request.json();
        const email = make.email?.toLowerCase().trim();
        const password = make.password;
        const name = make.name;

        if (!email || !password || !name) {
            return Response.json({
                success: false,
                error: "Email, password, and name are required"
            }, { status: 400 })
        }

        await connectDb();

        const existingUser = await User.findOne({ email }).select('_id');
        if (existingUser) {
            return Response.json({
                success: false,
                error: "Account already exists with this email"
            }, { status: 409 })
        }

        let img = "https://cdn-icons-png.flaticon.com/128/1077/1077012.png"
        var cipherpass = CryptoJS.AES.encrypt(password, process.env.CRYPTO_SECRET).toString();

        let u = new User({
            name: name,
            email: email,
            password: cipherpass,
            img: img
        })
        await u.save();

        // CRITICAL FIX: Use same JWT library as login (jose SignJWT)
        const token = await sign({email: email, name: name}, process.env.JWT_SECRET)
        return Response.json({ success: true, token }, { status: 200 })

    } catch (error) {
        return Response.json({
            success: false,
            error: error.message || "Signup failed"
        }, { status: 400 })
    }
}

async function sign(payload, secret) {
    const iat = Math.floor(Date.now() / 1000);
    const exp = iat + 60 * 60; // one hour

    return new SignJWT({ ...payload })
        .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
        .setExpirationTime(exp)
        .setIssuedAt(iat)
        .setNotBefore(iat)
        .sign(new TextEncoder().encode(secret));
}

export { POST };
