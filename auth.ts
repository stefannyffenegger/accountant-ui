import Credentials from "@auth/core/providers/credentials";
import NextAuth from "next-auth";
import { z } from "zod";
import { authConfig } from "./auth.config";
import { User } from "./app/lib/definitions";

async function getUser(email: string, password: string): Promise<User | null> {
  try {
    // get new JWT pair (access, refresh token)
    const res = await fetch(process.env.BACKEND_URL + "/auth/jwt/create/", {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      // invalid credentials
      return null;
    }

    // prepare user object
    const parsedResponse = await res.json();
    let user: User = { email };
    user.refresh_token = parsedResponse.refresh;
    user.access_token = parsedResponse.access;

    //TODO: fetch other user attributes from /auth/users/me/ (with access jwt)

    // return user object
    return user;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    return null;
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;

          const user = await getUser(email, password);
          // could probably just return user, since it can only be User | null
          //if (!user) return null; >> uncomment if needed
          console.log("USER:", user);
          return user;
        }

        console.log("Invalid credentials");
        return null;
      },
    }),
  ],
});
