import { z } from "zod";

export const orderSchema = z.object({
  customerName: z.string().min(2, { message: "Customer name must be at least 2 characters." }),
  status: z.enum(["Pending", "Shipped", "Delivered", "Cancelled"]),
  total: z.preprocess(
    (a) => parseFloat(a as string),
    z.number().positive({ message: "Total must be a positive number." })
  ),
});

export type OrderFormValues = z.infer<typeof orderSchema>;
