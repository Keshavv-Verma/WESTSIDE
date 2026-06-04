import { NextResponse } from 'next/server'
import { jwtVerify } from 'jose';

export const config = {
  matcher: ['/admin/:path*', '/orders/:path*'],
};

export async function middleware(req, res) {
  const requestHeaders = new Headers(req.headers);

  try {
    let cookie = req.cookies.get('token');
    let token = null;
    
    if (cookie) {
      token = cookie.value;
    }

    // If no token and trying to access protected routes
    if (!token) {
      if (req.nextUrl.pathname.startsWith('/orders') || req.nextUrl.pathname.startsWith('/admin')) {
        return NextResponse.redirect(new URL('/Login', req.url))
      }
    }

    // CRITICAL FIX: Actually verify the JWT token
    if (token && process.env.JWT_SECRET) {
      try {
        const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
        requestHeaders.set('user-email', payload.email || 'authenticated');
        requestHeaders.set('user-name', payload.name || '');
        requestHeaders.set('user-verified', 'true');
      } catch (jwtError) {
        requestHeaders.set('user-email', 'no');
        requestHeaders.set('user-verified', 'false');
        // Token verification failed - redirect to login for protected routes
        if (req.nextUrl.pathname.startsWith('/orders') || req.nextUrl.pathname.startsWith('/admin')) {
          return NextResponse.redirect(new URL('/Login', req.url))
        }
      }
    } else {
      requestHeaders.set('user-email', 'no');
      requestHeaders.set('user-verified', 'false');
    }

    return NextResponse.next({
      request: {
        headers: requestHeaders
      }
    })
    
  } catch (error) {
    requestHeaders.set('user-email', 'no');
    requestHeaders.set('user-verified', 'false');
    
    if (req.nextUrl.pathname.startsWith('/orders') || req.nextUrl.pathname.startsWith('/admin')) {
      return NextResponse.redirect(new URL('/Login', req.url))
    }
    
    return NextResponse.next({
      request: {
        headers: requestHeaders
      }
    })
  }
}
