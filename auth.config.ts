import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  providers: [
    // added later in auth.ts since it requires bcrypt which is only compatible with Node.js
    // while this file is also used in non-Node.js environments
  ],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      console.log("User?: ", auth?.user)
      console.log("AuthToken?: ", auth?.expires)
      //console.log("AuthRequest: ", nextUrl)
      //const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      /*if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      } */
      if(isLoggedIn){
        return true; //Response.redirect(new URL(nextUrl.search, nextUrl));
      }
      return false;
    }, 
  },
} satisfies NextAuthConfig;
