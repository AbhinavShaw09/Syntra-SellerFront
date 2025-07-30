import { z } from "zod";

export const categorySchema = z.object({
  name: z
    .string()
    .min(2, { message: "Category name must be at least 4 characters." }),
  description: z
    .string()
    .min(2, { message: "Description must be at least 10 characters." }),
  image_url: z.string().optional(),
});

export type CategoryFormValues = z.infer<typeof categorySchema>;
