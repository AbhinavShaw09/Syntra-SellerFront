"use client";

import React from "react";
import { AddProductForm } from "@/components/products/AddProductForm";
import { ProductTable } from "@/components/products/ProductTable";
import NotFound from "../../not-found";
import Loader from "@/components/shared/Loader";
import { useProductManager } from "@/hooks/catalogue/product/useProductManager";

export default function ProductPage() {
  const {
    products,
    isLoading,
    error,
    isAddProductFormOpen,
    setIsAddProductFormOpen,
    handleAddProduct,
    handleDeleteProduct,
    handleDuplicateProduct,
  } = useProductManager();

  if (isLoading) return <Loader />;
  if (error) return <NotFound />;

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
        All Products
      </h1>
      <ProductTable
        data={products}
        onAddProductClick={() => setIsAddProductFormOpen(true)}
        onDeleteProductClick={handleDeleteProduct}
        onDuplicateProductClick={handleDuplicateProduct}
      />
      <AddProductForm
        isOpen={isAddProductFormOpen}
        onOpenChange={setIsAddProductFormOpen}
        onAddProduct={handleAddProduct}
      />
    </div>
  );
}
