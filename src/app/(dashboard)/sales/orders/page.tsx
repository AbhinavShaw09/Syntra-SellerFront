"use client";

import React from "react";
import { AddOrderForm } from "@/components/sales/orders/AddOrderForm";
import { OrderTable } from "@/components/sales/orders/OrderTable";
import NotFound from "../../not-found";
import Loader from "@/components/shared/Loader";
import { useOrderManager } from "@/hooks/sales/useOrderManager";

export default function OrderPage() {
  const {
    orders,
    isLoading,
    error,
    isAddOrderFormOpen,
    setIsAddOrderFormOpen,
    handleAddOrder,
    handleDeleteOrder,
    handleDuplicateOrder,
  } = useOrderManager();

  if (isLoading) return <Loader />;
  if (error) return <NotFound />;

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
        All Orders
      </h1>
      <OrderTable
        data={orders}
        onAddOrderClick={() => setIsAddOrderFormOpen(true)}
        onDeleteOrderClick={handleDeleteOrder}
        onDuplicateOrderClick={handleDuplicateOrder}
      />
      <AddOrderForm
        isOpen={isAddOrderFormOpen}
        onOpenChange={setIsAddOrderFormOpen}
        onAddOrder={handleAddOrder}
      />
    </div>
  );
}