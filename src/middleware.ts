import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('jwt_token')?.value;
  const isSessionPage = request.nextUrl.pathname.startsWith('/tickets');

  if (!token && isSessionPage) {
    return NextResponse.redirect(new URL('/auth', request.url));
  }

  return NextResponse.next();
}
