"use server";

import { db } from "@/db/db";
import { usersTable } from "@/db/schema";
import bcrypt from "bcrypt";
import { signIn, signOut } from "@/auth";
import { z } from "zod";
import { loginSchema, signupSchema } from "@/schemas/auth";
import { getUserByEmail } from "@/server/queries/users";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

export const signup = async (data: z.infer<typeof signupSchema>) => {
  const validatedFields = signupSchema.safeParse(data);

  if (!validatedFields.success) {
    return { error: "Invalid fields." };
  }

  try {
    const { name, email, password } = data;

    const user = await getUserByEmail(email);
    if (user) {
      return {
        error: "This email has already been registered.",
      };
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await db.insert(usersTable).values({
      name,
      email,
      password: hashedPassword,
    });

    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      if (error.type === "CredentialsSignin") {
        return { error: "Failed to sign in user." };
      } else {
        return { error: "Something went wrong!" };
      }
    }
    throw error;
  }

  redirect("/decks");
};

export const login = async (data: z.infer<typeof loginSchema>) => {
  const validatedFields = loginSchema.safeParse(data);

  if (!validatedFields.success) {
    return { error: "Invalid fields." };
  }

  const { email, password } = validatedFields.data;

  const user = await getUserByEmail(email);
  if (!user || !user.password) {
    return { error: "You have entered an incorrect email or password." };
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return { error: "You have entered an incorrect email or password." };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      if (error.type === "CredentialsSignin") {
        return { error: "You have entered an incorrect email or password." };
      } else {
        return { error: "Something went wrong!" };
      }
    }

    throw error;
  }

  redirect("/decks");
};

export const logout = async () => {
  await signOut({ redirectTo: "/" });
};

export const googleLogin = async () => {
  await signIn("google", { redirectTo: "/decks" }, { prompt: "login" });
};

export const githubLogin = async () => {
  await signIn("github", { redirectTo: "/decks" });
};
