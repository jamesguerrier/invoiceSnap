import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  trustHost: true,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isDashboard = nextUrl.pathname.startsWith("/dashboard");
      const isClients = nextUrl.pathname.startsWith("/clients");
      const isSettings = nextUrl.pathname.startsWith("/settings");

      if (isDashboard || isClients || isSettings) {
        if (isLoggedIn) return true;
        return false; // Redirect to login
      }
      return true;
    },
  },
  providers: [], // Added in auth.ts
} satisfies NextAuthConfig;
