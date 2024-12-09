import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import { getUserByEmail } from "./server/queries/users";
import bcrypt from "bcrypt";
import { loginSchema } from "./schemas/auth";
import { db } from "./db/db";
import { userTable } from "./db/schema";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { success, data } = loginSchema.safeParse(credentials);

        if (success) {
          const { email, password } = data;

          const user = await getUserByEmail(email);
          if (!user || !user.password) {
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
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") {
        const { name, email } = user;

        if (!name || !email) return false;

        const existingUser = await getUserByEmail(email);
        if (!existingUser) {
          await db.insert(userTable).values({ name, email });
        }
      }

      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        if (!user.email) return token;

        const existingUser = await getUserByEmail(user.email);
        if (!existingUser) return token;

        token.id = existingUser.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
      }
      return session;
    },
  },
});
