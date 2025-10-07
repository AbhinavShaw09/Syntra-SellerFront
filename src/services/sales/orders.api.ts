import { z } from "zod";
import { apiFetch } from "@/lib/api";
import { BakckendEndpoints } from "@/utils/endpoints";
import { Order } from "@/types/sales/order";
import { orderSchema } from "@/schemas/sales/OrderSchema";

type CreateOrderPayload = z.infer<typeof orderSchema>;

export const fetchAllOrders = async (token?: string): Promise<Order[]> => {
  const response = await apiFetch<Order[]>(
    BakckendEndpoints.ORDERS.LIST_SELLER_ORDERS,
    {
      token: token,
    }
  );
  return response;
};

export const createOrderApi = async (
  newOrderData: CreateOrderPayload,
  token?: string
): Promise<Order> => {
  const createdOrder = await apiFetch<Order>(
    BakckendEndpoints.ORDERS.CREATE_SELLER_ORDERS,
    {
      method: "POST",
      body: newOrderData,
      token: token,
    }
  );
  return createdOrder;
};

export const updateOrderApi = async (
  orderId: string,
  orderData: CreateOrderPayload,
  token?: string
): Promise<Order> => {
  const updatedOrder = await apiFetch<Order>(
    `${BakckendEndpoints.ORDERS.UPDATE_SELLER_ORDERS}${orderId}/`,
    {
      method: "PUT",
      body: orderData,
      token: token,
    }
  );
  return updatedOrder;
};

export const deleteOrderApi = async (
  orderId: string,
  token?: string
): Promise<void> => {
  await apiFetch<void>(
    `${BakckendEndpoints.ORDERS.DELETE_SELLER_ORDERS}${orderId}/`,
    {
      method: "DELETE",
      token: token,
    }
  );
};