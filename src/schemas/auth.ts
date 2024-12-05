import { z } from "zod";

export const signupSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required.")
    .max(50, "Must be less than 50 characters"),
  email: z.string().email("Email address is required."),
  password: z.string().min(8, "Password must be at least 8 characters."),
});

export const loginSchema = z.object({
  email: z.string().email("Email address is required."),
  password: z.string().min(1, "Password is required."),
});
