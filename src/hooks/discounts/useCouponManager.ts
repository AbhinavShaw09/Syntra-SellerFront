"use client";

import { z } from "zod";
import { useState, useCallback, useEffect } from "react";

import { couponSchema } from "@/schemas/discounts/CouponSchema";
import { Coupon } from "@/types/discounts/coupon";
import { useAuth } from "@/providers/AuthProvider";
import {
  fetchAllCoupons,
  createCouponApi,
  deleteCouponApi,
} from "@/services/discounts/coupons.api";
import { useApiHandler } from "@/hooks/common/useApiHandler";
import { generateCopyName } from "@/utils/common";

export function useCouponManager() {
  const { user } = useAuth();
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [isAddCouponFormOpen, setIsAddCouponFormOpen] = useState(false);

  const { isLoading, error, call } = useApiHandler();

  const fetchCoupons = useCallback(async () => {
    const response = await call(() => fetchAllCoupons(user?.accessToken), {
      errorMessage: "Failed to load coupons",
    });
    if (response) setCoupons(response);
  }, [user?.accessToken, call]);

  const handleAddCoupon = useCallback(
    async (newCouponData: z.infer<typeof couponSchema>) => {
      const created = await call(
        () => createCouponApi(newCouponData, user?.accessToken),
        {
          errorMessage: "Failed to create coupon",
        }
      );
      if (created) {
        setCoupons((prev) => [...prev, created]);
        setIsAddCouponFormOpen(false);
      }
    },
    [user?.accessToken, call]
  );

  const handleDuplicateCoupon = useCallback(
    async (coupon: Coupon) => {
      const { code, ...rest } = coupon;
      const duplicatedCoupon = {
        ...rest,
        code: generateCopyName(
          code,
          coupons.map((c) => c.code)
        ),
      };
      const created = await call(
        () => createCouponApi(duplicatedCoupon, user?.accessToken),
        {
          errorMessage: "Failed to duplicate coupon",
        }
      );
      if (created) {
        setCoupons((prev) => [...prev, created]);
      }
    },
    [user?.accessToken, coupons, call]
  );

  const handleDeleteCoupon = useCallback(
    async (couponId: string) => {
      const deleted = await call(
        () => deleteCouponApi(couponId, user?.accessToken),
        {
          errorMessage: "Failed to delete coupon",
          successMessage: "Coupon deleted successfully",
        }
      );
      if (deleted !== null) {
        setCoupons((prev) =>
          prev.filter((coupon) => coupon.id !== couponId)
        );
      }
    },
    [user?.accessToken, call]
  );

  useEffect(() => {
    if (user?.accessToken) {
      fetchCoupons();
    }
  },[user?.accessToken, fetchCoupons]);

  return {
    coupons,
    isLoading,
    error,
    isAddCouponFormOpen,
    setIsAddCouponFormOpen,
    fetchCoupons,
    handleAddCoupon,
    handleDuplicateCoupon,
    handleDeleteCoupon,
  };
}
