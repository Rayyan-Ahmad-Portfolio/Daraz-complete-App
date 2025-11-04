import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(3, "Username is required"),
  email: z.string().email("Valid email is required"),
  phoneNumber: z.string().min(11, "Phone number must be 11 digits").max(11, "Phone number must be 11 digits"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role : z.any(),
});

export const loginSchema = z.object({
email: z.string().email("Valid email is required"),
  password: z.string().min(6, "Password is required"),
});
