import { NextResponse } from 'next/server'

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

    requestHeaders.set('user-email', token ? 'authenticated' : 'no');

    return NextResponse.next({
      request: {
        headers: requestHeaders
      }
    })
    
  } catch (error) {
    requestHeaders.set('user-email', 'no');
    
    if (!req.nextUrl.pathname.startsWith('/Login') && !req.nextUrl.pathname.startsWith('/SignUp')) {
      return NextResponse.redirect(new URL('/Login', req.url))
    }
    
    return NextResponse.next({
      request: {
        headers: requestHeaders
      }
    })
  }
}
