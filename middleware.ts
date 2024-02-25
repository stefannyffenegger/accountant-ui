import NextAuth from 'next-auth';
import { authConfig } from './auth.config';

import { auth } from "./auth"

export default NextAuth(authConfig).auth;

//export default auth((req) => {
  // req.auth
//})

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|$).*)"],
}