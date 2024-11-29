"use server";

import { db } from "@/db/db";
import { usersTable } from "@/db/schema";
import bcrypt from "bcrypt";
import { signIn } from "@/auth";

interface SignupData {
  name: string;
  email: string;
  password: string;
}

export async function createUser(data: SignupData): Promise<string> {
  try {
    const { name, email, password } = data;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into the database
    await db.insert(usersTable).values({
      name,
      email,
      password: hashedPassword,
    });

    return "User created successfully";
  } catch (error: any) {
    console.error("Error creating user:", error);

    if (error.code === "23505") {
      // Handle unique constraint violations
      throw new Error("Email already exists");
    }

    throw new Error("Internal server error");
  }
}

interface LoginData {
  email: string;
  password: string;
}

export const login = async (data: LoginData) => {
  const { email, password } = data;

  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false, // Prevent automatic redirection
    });

    if (result?.error) {
      throw new Error(result.error);
    }

    return "Login successful!";
  } catch (error: any) {
    console.error("Login error:", error);
    throw new Error("Invalid email or password.");
  }
};
