import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isAdminRoute = pathname.startsWith('/dashboard');

  if (isAdminRoute) {
    const cookies = req.cookies.getAll();
    const hasSessionCookie = cookies.some(
      (cookie) =>
        cookie.name.includes('next-auth.session-token') ||
        cookie.name.includes('__Secure-next-auth.session-token')
    );

    if (!hasSessionCookie) {
      const url = new URL('/auth/sign-in', req.url);
      url.searchParams.set('callbackUrl', req.nextUrl.pathname);
      return NextResponse.redirect(url);
    }

    // Role check will be handled by the layout or page components
    // to avoid getToken issues with Next.js 16 proxy.ts RSC requests
  }

  return NextResponse.next();
}

// ✅ Protect routes
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/profile/:path*',
    '/settings/:path*',
    '/add-recipe',
  ],
};
