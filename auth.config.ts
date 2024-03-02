import { JWT } from "@auth/core/jwt";
import type { NextAuthConfig } from "next-auth";
import { User } from "./app/lib/definitions";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  providers: [
    // added later in auth.ts since it requires bcrypt which is only compatible with Node.js
    // while this file is also used in non-Node.js environments
  ],
  callbacks: {
    //TODO optional: async signIn(){} >> e.g. only allow login for verified accounts
    //TODO: async jwt(){} >> add refresh token rotation
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      console.log("AUTHORIZED User: ", auth?.user);
      console.log("AUTHORIZED Expires?: ", auth?.expires);
      if (isLoggedIn) {
        return true;
      }
      return false;
    },
    async jwt({ token, user }) {
      if (user) {
        // Save the access token and refresh token in the JWT on the initial login
        // User object is only sent on initial login
        //console.log("JWT ACCESS INIT", (user as User).access_token);
        //console.log("JWT REFRESH INIT", (user as User).refresh_token);
        //console.log("JWT TOKEN INIT", token);
        return {
          ...token,
          access_token: (user as User).access_token,
          refresh_token: (user as User).refresh_token,
          user,
        };
      } else if (await verifyJWT(token)) {
        // Return access token if it's still valid
        return { ...token, user };
      } else {
        // If the access token has expired, try to refresh it
        try {
          const response = await fetch(
            process.env.BACKEND_URL + "/auth/jwt/refresh/",
            {
              method: "POST",
              body: JSON.stringify({
                refresh: token.refresh_token,
              }),
              headers: { "Content-Type": "application/json" },
            }
          );
          const access = await response.json();

          if (!response.ok) throw access;
          return {
            ...token, // Keep the previous token properties
            access_token: access,
            user,
          };
        } catch (error) {
          console.error("Failed to refresh access token", error);
          // The error property will be used client-side to handle the refresh token error
          return { ...token, error: "RefreshAccessTokenError" as const };
        }
      }
    },
    async session({ session, token }) {
      //console.log("SESSION session:", session);
      //console.log("SESSION token:", token);
      // Send properties to the client, like an access_token from a provider.
      return { ...session, token };
    },
  },
} satisfies NextAuthConfig;

async function verifyJWT(jwt: JWT): Promise<boolean> {
  try {
    // verify access or refresh jwt
    //console.log("VERIFY:", jwt.access_token)
    const res = await fetch(process.env.BACKEND_URL + "/auth/jwt/verify/", {
      method: "POST",
      body: JSON.stringify({
        token: jwt.access_token,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      // invalid jwt
      return false;
    }
    return true;
  } catch (error) {
    console.error("Failed to verify jwt:", error);
    return false;
  }
}
