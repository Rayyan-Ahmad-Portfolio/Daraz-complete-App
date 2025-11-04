import { z } from "zod";

export const createPermissionSchema = z.object({
  module: z
    .string()
    .min(2, { message: "Module name must be at least 2 characters" })
    .refine((val) => val.trim().length > 0, {
      message: "Module name is required",
    }),

  actions: z
    .array(z.string().min(1, { message: "Action name cannot be empty" }))
    .nonempty({ message: "At least one action is required" }),

  description: z
    .string()
    .min(5, { message: "Description must be at least 5 characters" })
    .refine((val) => val.trim().length > 0, {
      message: "Description is required",
    }),
});


export const updatePermissionSchema = z.object({
  module: z
    .string()
    .min(2, { message: "Module name must be at least 2 characters" })
    .refine((val) => val.trim().length > 0, {
      message: "Module name is required",
    }).optional(),

  actions: z
    .array(z.string().min(1, { message: "Action name cannot be empty" }))
    .nonempty({ message: "At least one action is required" }).optional(),

  description: z
    .string()
    .min(5, { message: "Description must be at least 5 characters" })
    .refine((val) => val.trim().length > 0, {
      message: "Description is required",
    }).optional(),
});