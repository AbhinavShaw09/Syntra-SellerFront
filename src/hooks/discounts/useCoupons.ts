import { useState, useEffect } from "react";
import { Coupon } from "@/types/discounts/coupon";
import { fetchAllCoupons } from "@/services/discounts/coupons.api";
import { useAuth } from "@/providers/AuthProvider";

const useCoupons = () => {
  const { user } = useAuth();
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getCoupons = async () => {
      try {
        setLoading(true);
        const fetchedCoupons = await fetchAllCoupons(user?.accessToken);
        setCoupons(fetchedCoupons);
      } catch {
        setError("Failed to fetch coupons.");
      } finally {
        setLoading(false);
      }
    };

    if (user?.accessToken) {
      getCoupons();
    }
  }, [user?.accessToken]);

  return { coupons, loading, error };
};

export default useCoupons;
