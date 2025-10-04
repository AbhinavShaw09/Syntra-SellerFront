import { z } from "zod";

export const productSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Product name must be at least 2 characters." }),
  category_id: z
    .string()
    .min(1, { message: "Please select a category." }),
  original_price: z.preprocess(
    (a) => parseFloat(a as string),
    z.number().positive({ message: "Original price must be a positive number." })
  ),
  selling_price: z.preprocess(
    (a) => parseFloat(a as string),
    z.number().positive({ message: "Selling price must be a positive number." })
  ),
  inventory_count: z.preprocess(
    (a) => parseInt(a as string),
    z
      .number()
      .int()
      .nonnegative({
        message: "Inventory count must be a non-negative integer.",
      })
  ),
});

export type ProductFormValues = z.infer<typeof productSchema>;
