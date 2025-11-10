import {z} from 'zod';

export const createCategory = z.object({
    name: z.string().min(3).max(50),
    description: z.string().max(500).optional(),
    parent: z.string().length(24).optional(),
    image: z.string().url().optional(),
    isActive: z.boolean().optional(),
});

export const updatedCategory = z.object({
    name: z.string().min(3).max(50).optional(),
    description: z.string().max(500).optional(),
    parent: z.string().length(24).optional(),
    image: z.string().url().optional(),
    isActive: z.boolean().optional(),
});
