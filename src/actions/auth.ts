"use server";

import { db } from "@/db/db";
import { usersTable } from "@/db/schema";
import bcrypt from "bcrypt";
import { signIn } from "@/auth";
import { z } from "zod";
import { loginSchema, signupSchema } from "@/schemas/auth";
import { getUserByEmail } from "@/lib/queries/user";
import { AuthError } from "next-auth";

export const signup = async (data: z.infer<typeof signupSchema>) => {
  const validatedData = signupSchema.safeParse(data);

  if (!validatedData.success) {
    const errors = validatedData.error.flatten();
    console.log(errors);
    return {
      success: false,
      message: "Validation failed",
    };
  }

  try {
    const { name, email, password } = data;

    const user = await getUserByEmail(email);
    if (user) {
      return {
        success: false,
        message: "This email address has already been registered.",
      };
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await db.insert(usersTable).values({
      name,
      email,
      password: hashedPassword,
    });

    return { success: true, message: "User created successfully" };
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Failed to create user");
  }
};

export const login = async (data: z.infer<typeof loginSchema>) => {
  const validatedFields = loginSchema.safeParse(data);

  if (!validatedFields.success) {
    return { success: false, message: "Invalid fields." };
  }

  const { email, password } = validatedFields.data;

  const user = await getUserByEmail(email);
  if (!user) {
    return {
      success: false,
      message: "You have entered an incorrect email or password.",
    };
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return {
      success: false,
      message: "You have entered an incorrect email or password.",
    };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/",
    });

    return { success: true, message: "Login success!" };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { success: false, error: "Invalid credentials!" };
        default:
          return { success: false, error: "Something went wrong!" };
      }
    }

    throw error;
  }
};
