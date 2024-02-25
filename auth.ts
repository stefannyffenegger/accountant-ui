import NextAuth, { User } from 'next-auth';
import Credentials from '@auth/core/providers/credentials';
import { z } from 'zod';
import { authConfig } from './auth.config';

async function getUser(email: string): Promise<User | undefined> {
  try {
    const result = await fetch("http://127.0.0.1:8000/api/users");
    const user = await result.json();
    return user;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
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

          const user = await getUser(email); //check jwt/response "getJWT"
          if (!user) return null;
          return user;
        }

        console.log('Invalid credentials');
        return null;
      },
    }),
  ],
});
