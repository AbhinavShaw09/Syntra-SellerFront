import { useState, useEffect } from "react";
import { Coupon } from "@/types/discounts/coupon";
import { fetchAllCoupons } from "@/services/discounts/coupons.api";
import { useAuth } from "@/providers/AuthProvider";

const useCoupons = () => {
  const { token } = useAuth();
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getCoupons = async () => {
      try {
        setLoading(true);
        const fetchedCoupons = await fetchAllCoupons(token as string);
        setCoupons(fetchedCoupons);
      } catch (err) {
        setError("Failed to fetch coupons.");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      getCoupons();
    }
  }, [token]);

  return { coupons, loading, error };
};

export default useCoupons;
