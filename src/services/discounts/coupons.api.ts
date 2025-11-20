import { z } from "zod";
import { couponSchema } from "@/schemas/discounts/CouponSchema";
import { Coupon } from "@/types/discounts/coupon";
import { apiFetch } from "@/lib/api";

type CreateCouponPayload = z.infer<typeof couponSchema>;

const BASE_URL = "http://localhost:8000";

export const fetchAllCoupons = async (token?: string): Promise<Coupon[]> => {
  return apiFetch<Coupon[]>(`${BASE_URL}/seller/discounts/`, {
    method: "GET",
    token,
  });
};

export const createCouponApi = async (
  newCouponData: CreateCouponPayload,
  token?: string
): Promise<Coupon> => {
  return apiFetch<Coupon>(`${BASE_URL}/seller/discounts/`, {
    method: "POST",
    body: newCouponData,
    token,
  });
};

export const deleteCouponApi = async (
  couponId: string,
  token?: string
): Promise<void> => {
  return apiFetch<void>(`${BASE_URL}/seller/discounts/${couponId}/`, {
    method: "DELETE",
    token,
  });
};
