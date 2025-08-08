export interface Coupon {
  id: string;
  code: string;
  discountType: "percentage" | "fixed";
  value: number;
  expiryDate: string;
}
