import NextAuth from 'next-auth';
import { authConfig } from './auth.config';

export default NextAuth(authConfig).auth;

export const config = {
  // Matcher tells Next.js which routes this middleware should apply to
  matcher: ['/((?!api/auth|_next/static|_next/image|favicon.ico).*)'],
};
