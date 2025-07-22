"use client";

import { useState, useCallback, useEffect } from "react";
import { z } from "zod";

import { productSchema } from "@/schemas/ProductSchema";
import { Product } from "@/types/product";
import { useAuth } from "@/providers/AuthProvider";
import {
  fetchAllProducts,
  createProductApi,
  deleteProductApi,
} from "@/services/catalogue/products/products.api";
import { generateCopyName } from "@/utils/product";

import { useApiHandler } from "@/hooks/common/useApiHandler";

export function useProductManager() {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [isAddProductFormOpen, setIsAddProductFormOpen] = useState(false);

  const { isLoading, error, call } = useApiHandler();

  const fetchProducts = useCallback(async () => {
    const response = await call(() => fetchAllProducts(user?.accessToken), {
      errorMessage: "Failed to load products",
    });
    if (response) setProducts(response);
  }, [user?.accessToken, call]);

  const handleAddProduct = useCallback(
    async (newProductData: z.infer<typeof productSchema>) => {
      const created = await call(
        () => createProductApi(newProductData, user?.accessToken),
        {
          errorMessage: "Failed to create product",
        }
      );
      if (created) {
        setProducts((prev) => [...prev, created]);
        setIsAddProductFormOpen(false);
      }
    },
    [user?.accessToken, call]
  );

  const handleDuplicateProduct = useCallback(
    async (product: Product) => {
      const { name, ...rest } = product;
      const duplicatedProduct = {
        ...rest,
        name: generateCopyName(
          name,
          products.map((p) => p.name)
        ),
      };
      const created = await call(
        () => createProductApi(duplicatedProduct, user?.accessToken),
        {
          errorMessage: "Failed to duplicate product",
        }
      );
      if (created) {
        setProducts((prev) => [...prev, created]);
      }
    },
    [user?.accessToken, products, call]
  );

  const handleDeleteProduct = useCallback(
    async (productId: string) => {
      const deleted = await call(
        () => deleteProductApi(productId, user?.accessToken),
        {
          errorMessage: "Failed to delete product",
          successMessage: "Product deleted successfully",
        }
      );
      if (deleted !== null) {
        setProducts((prev) =>
          prev.filter((product) => product.id !== productId)
        );
      }
    },
    [user?.accessToken, call]
  );

  useEffect(() => {
    if (user?.accessToken) {
      fetchProducts();
    }
  },[user?.accessToken, fetchProducts]);

  return {
    products,
    isLoading,
    error,
    isAddProductFormOpen,
    setIsAddProductFormOpen,
    fetchProducts,
    handleAddProduct,
    handleDuplicateProduct,
    handleDeleteProduct,
  };
}
