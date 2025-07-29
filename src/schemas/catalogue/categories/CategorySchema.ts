import { z } from "zod";

export const categorySchema = z.object({
  name: z
    .string()
    .min(2, { message: "Category name must be at least 4 characters." }),
  description: z
    .string()
    .min(2, { message: "Description must be at least 10 characters." }),
  category: z
    .string()
    .min(2, { message: "Category must be at least 5 characters." }),
  image_url: z
    .string()
    .min(2, { message: "Description must be at least 5 characters." }),
});

export type CategoryFormValues = z.infer<typeof categorySchema>;
