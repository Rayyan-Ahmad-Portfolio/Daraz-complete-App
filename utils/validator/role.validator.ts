import { z } from "zod";

export const createRoleSchema = z.object({
  name: z.enum(["Buyer", "Store Owner", "Store Manager"]),
  description: z
    .string()
    .min(5, "Description must be at least 5 characters long"),
  permissionIds: z
    .array(z.string().min(1, "Permission ID cannot be empty"))
    .nonempty("At least one permission ID is required"),
});

export const updatePermissionSchema = z.object({
  module: z.string().optional(),
  actions: z.array(z.string()).optional(),
  description: z.string().optional(),
});