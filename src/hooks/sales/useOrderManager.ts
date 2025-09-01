"use client";

import { z } from "zod";
import { useState, useCallback, useEffect } from "react";

import { orderSchema } from "@/schemas/sales/OrderSchema";
import { Order } from "@/types/sales/order";
import { useAuth } from "@/providers/AuthProvider";
import {
  fetchAllOrders,
  createOrderApi,
  deleteOrderApi,
} from "@/services/sales/orders.api";
import { useApiHandler } from "@/hooks/common/useApiHandler";

export function useOrderManager() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isAddOrderFormOpen, setIsAddOrderFormOpen] = useState(false);

  const { isLoading, error, call } = useApiHandler();

  const fetchOrders = useCallback(async () => {
    const response = await call(() => fetchAllOrders(user?.accessToken), {
      errorMessage: "Failed to load orders",
    });
    if (response) setOrders(response);
  }, [user?.accessToken, call]);

  const handleAddOrder = useCallback(
    async (newOrderData: z.infer<typeof orderSchema>) => {
      const created = await call(
        () => createOrderApi(newOrderData, user?.accessToken),
        {
          errorMessage: "Failed to create order",
        }
      );
      if (created) {
        setOrders((prev) => [...prev, created]);
        setIsAddOrderFormOpen(false);
      }
    },
    [user?.accessToken, call]
  );


  const handleDeleteOrder = useCallback(
    async (orderId: string) => {
      const deleted = await call(
        () => deleteOrderApi(orderId, user?.accessToken),
        {
          errorMessage: "Failed to delete order",
          successMessage: "Order deleted successfully",
        }
      );
      if (deleted !== null) {
        setOrders((prev) =>
          prev.filter((order) => order.id !== orderId)
        );
      }
    },
    [user?.accessToken, call]
  );

  const handleDuplicateOrder = useCallback(
    async (order: Order) => {
      const { id, ...orderData } = order;
      const duplicated = await call(
        () => createOrderApi(orderData, user?.accessToken),
        {
          errorMessage: "Failed to duplicate order",
          successMessage: "Order duplicated successfully",
        }
      );
      if (duplicated) {
        setOrders((prev) => [...prev, duplicated]);
      }
    },
    [user?.accessToken, call]
  );

  useEffect(() => {
    if (user?.accessToken) {
      fetchOrders();
    }
  },[user?.accessToken, fetchOrders]);

  return {
    orders,
    isLoading,
    error,
    isAddOrderFormOpen,
    setIsAddOrderFormOpen,
    fetchOrders,
    handleAddOrder,
    handleDeleteOrder,
    handleDuplicateOrder,
  };
}
