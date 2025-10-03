import { useState, useEffect } from "react";
import { Order } from "@/types/sales/order";
import { fetchAllOrders } from "@/services/sales/orders.api";
import { useAuth } from "@/providers/AuthProvider";

const useOrders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getOrders = async () => {
      try {
        setLoading(true);
        const fetchedOrders = await fetchAllOrders(user?.accessToken);
        setOrders(fetchedOrders);
      } catch {
        setError("Failed to fetch orders.");
      } finally {
        setLoading(false);
      }
    };

    if (user?.accessToken) {
      getOrders();
    }
  }, [user?.accessToken]);

  return { orders, loading, error };
};

export default useOrders;
