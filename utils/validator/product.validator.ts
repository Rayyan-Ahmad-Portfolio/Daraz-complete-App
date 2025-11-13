import { z } from "zod";

const objectId = z
  .string()
  .regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId format");

export const createProductSchema = z.object({
  name: z.string().trim().min(3, "Product name is required"),
  description: z.string().trim().min(5, "Product description is required"),
  price: z.coerce.number().positive("Price must be greater than zero"),
  images: z.array(z.string().url("Invalid image URL")).optional(),
  category: objectId,
  store: objectId,
  inventory: objectId,
  rating: z.coerce.number().min(0).max(5).optional(),
  reviews: z.array(objectId).optional(),
});

export const updateProductSchema = createProductSchema.partial();
