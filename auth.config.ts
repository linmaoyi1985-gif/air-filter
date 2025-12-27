import type { NextAuthConfig } from 'next-auth';
import GitHub from 'next-auth/providers/github';

export const authConfig = {
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnLoginPage = nextUrl.pathname === '/login';

      // Allow access to login page
      if (isOnLoginPage) {
        return true;
      }

      // Require login for all other pages
      if (!isLoggedIn) {
        return false; // Redirect to login page
      }

      // Check whitelist
      const allowedLogins = process.env.ALLOWED_GITHUB_LOGINS?.split(',').map(s => s.trim()).filter(Boolean) || [];
      const allowedDomains = process.env.ALLOWED_EMAIL_DOMAINS?.split(',').map(s => s.trim()).filter(Boolean) || [];

      // If no whitelist configured, deny access (fail-safe)
      if (allowedLogins.length === 0 && allowedDomains.length === 0) {
        console.warn('No whitelist configured! Set ALLOWED_GITHUB_LOGINS or ALLOWED_EMAIL_DOMAINS');
        return false;
      }

      const userLogin = (auth.user as any).login || (auth.user as any).name;
      const userEmail = auth.user.email;

      // Check GitHub username
      if (userLogin && allowedLogins.includes(userLogin.toLowerCase())) {
        return true;
      }

      // Check email domain
      if (userEmail && allowedDomains.length > 0) {
        const emailDomain = userEmail.split('@')[1];
        if (allowedDomains.includes(emailDomain.toLowerCase())) {
          return true;
        }
      }

      // Not in whitelist
      return false;
    },
  },
  pages: {
    signIn: '/login',
  },
} satisfies NextAuthConfig;
