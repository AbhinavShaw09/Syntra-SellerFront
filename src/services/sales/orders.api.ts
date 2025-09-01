import { z } from "zod";
import { orderSchema } from "@/schemas/sales/OrderSchema";
import { Order } from "@/types/sales/order";

type CreateOrderPayload = z.infer<typeof orderSchema>;

const mockOrders: Order[] = [
  { id: "1", customerName: "John Doe", date: "2023-01-15", status: "Delivered", total: 150.00 },
  { id: "2", customerName: "Jane Smith", date: "2023-01-16", status: "Shipped", total: 75.50 },
  { id: "3", customerName: "Alice Johnson", date: "2023-01-17", status: "Pending", total: 200.25 },
];

export const fetchAllOrders = async (token?: string): Promise<Order[]> => {
  console.log("Fetching orders with token:", token);
  // In a real application, you would make an API call here.
  // For now, we're returning mock data.
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockOrders);
    }, 500); // Simulate network delay
  });
};

export const createOrderApi = async (
  newOrderData: CreateOrderPayload,
  token?: string
): Promise<Order> => {
  console.log("Creating order with token:", token);
  // In a real application, you would make an API call here.
  return new Promise((resolve) => {
    setTimeout(() => {
      const newOrder: Order = {
        id: `ORD-${Math.floor(Math.random() * 10000)}`, // mock id
        date: new Date().toISOString().split('T')[0], // mock date
        ...newOrderData,
      };
      // In a real app, the backend would persist this.
      // Here we're just returning it. The hook will add it to the state.
      resolve(newOrder);
    }, 500);
  });
};

export const deleteOrderApi = async (
  orderId: string,
  token?: string
): Promise<void> => {
  console.log(`Deleting order ${orderId} with token:`, token);
  // In a real application, you would make an API call here.
  return new Promise((resolve) => {
    setTimeout(() => {
      // Here we would check if the order was successfully deleted on the backend.
      resolve();
    }, 500);
  });
};