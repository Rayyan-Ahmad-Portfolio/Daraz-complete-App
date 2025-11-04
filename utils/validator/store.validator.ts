import { z } from "zod";

export const storeRegisterSchema = z.object({
  name: z.string().min(3, "Store name is required"),
  description: z.string().optional(),
  owner: z.string().array().min(1, "Owner ID is required"),
  products: z.string().array().optional(),
  inventory: z.string().array().optional(),
  address: z.object({
    street: z.string().optional(),
    city: z.string().optional(),
    province: z.string().optional(),
    postalCode: z.string().optional(),
    }),
    status: z.enum(["active", "suspended", "pending"]).optional(),
});

export const storeUpdateSchema = z.object({
  name: z.string().min(3).optional(),
  description: z.string().optional(),
    managers: z.string().array().optional(),
    products: z.string().array().optional(),
    inventory: z.string().array().optional(),
    address: z.object({
    street: z.string().optional(),
    city: z.string().optional(),
    province: z.string().optional(),
    postalCode: z.string().optional(),}).optional(),
    status: z.enum(["active", "suspended", "pending"]).optional()});