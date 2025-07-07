"use client";

import * as React from "react";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";

import { productSchema } from "@/schemas/ProductSchema";
import { Product } from "@/types/product";
import { AddProductForm } from "@/components/products/AddProductForm";
import { ProductTable } from "@/components/products/ProductTable";
import { useAuth } from "@/providers/AuthProvider";

import {
  fetchAllProducts,
  createProductApi,
} from "@/services/catalogue/products/products.api";
import NotFound from "../../not-found";
import Loader from "@/components/shared/Loader";


export default function ProductPage() {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAddProductFormOpen, setIsAddProductFormOpen] = useState(false);

  const fetchProducts = React.useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetchAllProducts(user?.accessToken);
      setProducts(response);
    } catch (err: unknown) {
      console.error("Failed to fetch products:", err);
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred.";
      setError(errorMessage);
      toast.error("Failed to load products", {
        description: errorMessage || "Please try again.",
      });
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  }, [user]);

  React.useEffect(() => {
    if (user?.accessToken) {
      fetchProducts();
    }
  }, [fetchProducts, user]);

  const handleAddProduct = async (
    newProductData: z.infer<typeof productSchema>
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      const createdProduct = await createProductApi(
        newProductData,
        user?.accessToken
      );
      setProducts((prevProducts) => [...prevProducts, createdProduct]);
      setIsAddProductFormOpen(false);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred.";
      setError(errorMessage);
      toast.error("Failed to create product", {
        description: errorMessage || "Please try again.",
      });
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    <NotFound />;
  }

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
        All Products
      </h1>
      <ProductTable
        data={products}
        onAddProductClick={() => setIsAddProductFormOpen(true)}
      />
      <AddProductForm
        isOpen={isAddProductFormOpen}
        onOpenChange={setIsAddProductFormOpen}
        onAddProduct={handleAddProduct}
      />
    </div>
  );
}
