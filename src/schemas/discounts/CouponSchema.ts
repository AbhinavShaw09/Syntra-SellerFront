import { z } from "zod";

export const couponSchema = z.object({
  code: z.string().min(4, { message: "Coupon code must be at least 4 characters." }),
  discountType: z.enum(["percentage", "fixed"]),
  value: z.preprocess(
    (a) => parseFloat(a as string),
    z.number().positive({ message: "Value must be a positive number." })
  ),
  expiryDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
  }),
});

export type CouponFormValues = z.infer<typeof couponSchema>;
