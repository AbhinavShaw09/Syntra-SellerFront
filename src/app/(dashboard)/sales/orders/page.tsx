"use client";

import React from "react";
import NotFound from "../../not-found";
import Loader from "@/components/shared/Loader";
import { OrderTable } from "@/components/sales/orders/OrderTable";
import { EditOrderForm } from "@/components/sales/orders/EditOrderForm";
import { useOrderManager } from "@/hooks/sales/useOrderManager";

export default function OrderPage() {
  const {
    orders,
    isLoading,
    error,
    isEditOrderFormOpen,
    setIsEditOrderFormOpen,
    editingOrder,
    handleDeleteOrder,
    handleDuplicateOrder,
    handleEditOrder,
    openEditForm,
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
        onDeleteOrderClick={handleDeleteOrder}
        onDuplicateOrderClick={handleDuplicateOrder}
        onEditOrderClick={openEditForm}
      />
      <EditOrderForm
        isOpen={isEditOrderFormOpen}
        onOpenChange={setIsEditOrderFormOpen}
        onEditOrder={handleEditOrder}
        order={editingOrder}
      />
    </div>
  );
}