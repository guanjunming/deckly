import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { getUserByEmail } from "./lib/queries/user";
import bcrypt from "bcrypt";
import { loginSchema } from "./schemas/auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // console.log("credentials: " + JSON.stringify(credentials));
        const { success, data } = loginSchema.safeParse(credentials);

        if (success) {
          const { email, password } = data;

          const user = await getUserByEmail(email);
          if (!user) {
            return null;
          }

          const isPasswordValid = await bcrypt.compare(password, user.password);

          if (isPasswordValid) {
            return user;
          }
        }

        return null;
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
