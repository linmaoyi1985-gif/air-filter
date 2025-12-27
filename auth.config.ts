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
      const isOnLoginPage = nextUrl.pathname === "/login";
    
      // Allow access to login page
      if (isOnLoginPage) return true;
    
      // ✅ Require login for all other pages (TS can narrow correctly)
      if (!auth?.user) return false;
    
      // Check whitelist
      const allowedLogins =
        process.env.ALLOWED_GITHUB_LOGINS?.split(",")
          .map((s) => s.trim().toLowerCase())
          .filter(Boolean) || [];
      const allowedDomains =
        process.env.ALLOWED_EMAIL_DOMAINS?.split(",")
          .map((s) => s.trim().toLowerCase())
          .filter(Boolean) || [];
    
      // Fail-safe: no whitelist => deny
      if (allowedLogins.length === 0 && allowedDomains.length === 0) {
        console.warn(
          "No whitelist configured! Set ALLOWED_GITHUB_LOGINS or ALLOWED_EMAIL_DOMAINS"
        );
        return false;
      }
    
      // ✅ Safe reads
      const userLogin = String((auth.user as any)?.login ?? auth.user?.name ?? "").toLowerCase();
      const userEmail = String(auth.user?.email ?? "");
    
      // Check GitHub username
      if (userLogin && allowedLogins.includes(userLogin)) return true;
    
      // Check email domain
      if (userEmail && allowedDomains.length > 0) {
        const emailDomain = userEmail.split("@")[1]?.toLowerCase() ?? "";
        if (emailDomain && allowedDomains.includes(emailDomain)) return true;
      }
    
      return false;
    },
  },
  pages: {
    signIn: '/login',
  },
} satisfies NextAuthConfig;
