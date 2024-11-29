import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { getUserByEmail } from "./lib/queries/user";
import bcrypt from "bcrypt";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        try {
          // console.log("credentials: " + JSON.stringify(credentials));
          const { email, password } = credentials;

          const user = await getUserByEmail(email as string);

          if (!user) {
            return null;
          }

          const isPasswordValid = await bcrypt.compare(
            password as string,
            user.password
          );

          if (isPasswordValid) {
            return user;
          }

          return null;
        } catch (error) {
          console.log(error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt", // Use JWT for session management
  },
  callbacks: {
    async jwt({ token, user }) {
      // console.log("token before: " + JSON.stringify(token));
      // console.log("user: " + JSON.stringify(user));
      // Attach user data to the JWT token
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      // console.log("token after: " + JSON.stringify(token));
      return token;
    },
    async session({ session, token }) {
      // Attach the token data to the session object
      // console.log("session before: " + JSON.stringify(session));
      // console.log("seession token: " + JSON.stringify(token));
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      // console.log("session after: " + JSON.stringify(session));
      return session;
    },
  },
});
