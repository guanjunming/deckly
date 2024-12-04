import { z } from "zod";

export const signupSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required." })
    .max(50, { message: "Must be less than 50 characters" }),
  email: z.string().email({ message: "Email address is required." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." }),
});

export const loginSchema = z.object({
  email: z.string().email({ message: "Email address is required." }),
  password: z.string().min(1, { message: "Password is required." }),
});
