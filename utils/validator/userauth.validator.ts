import { z } from "zod";

export const addressSchema = z.object({
  street: z.string().trim().min(1, "Street is required").optional(),
  city: z.string().trim().min(1, "City is required").optional(),
  province: z.string().trim().min(1, "Province is required").optional(),
  postalCode: z.string().trim().min(1, "Postal code is required").optional(),
});

export const registerSchema = z.object({
  name: z.string().trim().min(3, "Name must be at least 3 characters"),
  email: z
    .string()
    .trim()
    .email("Invalid email format")
    .min(5, "Email must be at least 5 characters"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password too long"),
  phoneNumber: z
    .string()
    .trim()
    .regex(/^03\d{9}$/, "Phone number must start with 03 and have 11 digits"),
  role: z.union([
    z.string().trim().min(1, "Role is required"),
    z.array(z.string().trim().min(1, "Role cannot be empty")),
  ]),
  address: addressSchema.optional(),
});


export const loginSchema = z.object({
email: z.string().email("Valid email is required"),
  password: z.string().min(6, "Password is required"),
});
