import { NextResponse } from 'next/server'
import { SignJWT, jwtVerify } from 'jose';
import { decode } from "jsonwebtoken";
// This function can be marked `async` if using `await` inside
export async function middleware(req, res) {
  const requestHeaders = new Headers(req.headers);

  try {
    // const requestHeaders = new Headers(req.headers);
    // add field to request headers
    let cookie = req.cookies
    cookie = cookie.get('token')
    let query = null;
    if (cookie != undefined) {
      query = (cookie)['value']
      query = query.split('"')
      query = query[1]
    }

    // if (req.nextUrl.pathname === req.nextUrl.pathname.toLowerCase()){

    //   return NextResponse.next();
    // }

    let token = query;
    let payload = null;

    if (!token) {
      requestHeaders.set('user-email', "no")

      if (req.nextUrl.pathname.startsWith('/orders') || req.nextUrl.pathname.startsWith('/admin')) {
        return NextResponse.redirect(new URL('/Login', req.url))
      }

      return NextResponse.next({
        request: {
          headers: requestHeaders
        }
      })
    }

    if (token.length > 200) {
      // console.log("If Condtion Runnign");
      let decrypted = await decode(token)
      // decrypted=JSON.stringify(decrypted)

      payload = {
        name: decrypted.name,
        email: decrypted.email,
        exp: decrypted['exp'],
        nat: decrypted['iat'],
        nbf: decrypted['nbf'],
      }
      // console.log(decrypted+">>>>>>>>>>>>>>>>>>>>>>>");

    } else {

      const k = await jwtVerify(query, new TextEncoder().encode(process.env.JWT_SECRET));
      payload = k.payload;
    }
    requestHeaders.set('user-email', payload.email)

    if (req.nextUrl.pathname.startsWith('/admin') && payload.email !== process.env.NEXT_PUBLIC_ADMIN_MAIL) {

      return NextResponse.redirect(new URL('/', req.url));
    }
    if (query != null && (req.nextUrl.pathname.startsWith('/Login') || req.nextUrl.pathname.startsWith('/SignUp'))) {

      return NextResponse.redirect(new URL('/', req.url));
    }





    return NextResponse.next({
      request: {
        headers: requestHeaders
      }
    })

    // return NextResponse.redirect(new URL(req.nextUrl, req.url))   
  } catch (error) {
    requestHeaders.set('user-email', "no")

    if (req.nextUrl.pathname.startsWith('/products')) {


      return NextResponse.next({
        request: {
          headers: requestHeaders
        }
      })
    }
    if (!req.nextUrl.pathname.startsWith('/Login') && !req.nextUrl.pathname.startsWith('/SignUp')) {
      return NextResponse.redirect(new URL('/Login', req.url))
    }
  }
}

export const config = {
  matcher: ['/Login', '/SignUp', '/orders/:path*', '/admin/:path*', '/products/:path*'],
}
// See "Matching Paths" below to learn more
