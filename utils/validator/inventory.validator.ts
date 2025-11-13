import { z } from "zod";

const objectId = z
  .string()
  .regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId format");

export const createInventorySchema = z.object({
  store: objectId,
  product: objectId,
  stock: z.number().int().min(0),
  sold: z.number().int().min(0).optional(),
  warehouseLocation: z.object({
    type: z.literal("Point").default("Point"),
    coordinates: z
      .tuple([z.number(), z.number()])
      .refine(
        ([lng, lat]) => lng >= -180 && lng <= 180 && lat >= -90 && lat <= 90,
        "Invalid latitude or longitude"
      ),
  }),
});

export const updateInventorySchema = createInventorySchema.partial();
