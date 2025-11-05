import { z } from "zod";

export const addressSchema = z.object({
  street: z.string().trim().min(1, "Street is required").optional(),
  city: z.string().trim().min(1, "City is required").optional(),
  province: z.string().trim().min(1, "Province is required").optional(),
  postalCode: z.string().trim().min(1, "Postal code is required").optional(),
});

export const storeRegister = z.object({
  name: z.string().min(3, "Store name is required"),
  description: z.string().optional(),
  managers: z.array(z.string()).optional(),
  products: z.array(z.string()).optional(),
  inventory: z.array(z.string()).optional(),
  address: addressSchema.optional(),
  status: z.enum(["active", "suspended", "pending"]).optional(),
});

export const storeUpdateSchema = z.object({
  name: z.string().min(3).optional(),
  description: z.string().optional(),
  managers: z.array(z.string()).optional(),
  products: z.array(z.string()).optional(),
  inventory: z.array(z.string()).optional(),
  address: addressSchema.optional(),
  status: z.enum(["active", "suspended", "pending"]).optional(),
});
