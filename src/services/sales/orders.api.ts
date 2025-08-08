import { Order } from "@/types/sales/order";

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
