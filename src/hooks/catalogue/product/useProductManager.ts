"use client";

import { z } from "zod";
import { useState, useCallback, useEffect } from "react";

import { productSchema } from "@/schemas/catalogue/product/ProductSchema";
import { Product } from "@/types/catalogue/product/product";
import { useAuth } from "@/providers/AuthProvider";
import {
  fetchAllProducts,
  createProductApi,
  deleteProductApi,
  updateProductApi,
} from "@/services/catalogue/products/products.api";
import { useApiHandler } from "@/hooks/common/useApiHandler";

import { generateCopyName } from "@/utils/common";


export function useProductManager() {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [isAddProductFormOpen, setIsAddProductFormOpen] = useState(false);
  const [isEditProductFormOpen, setIsEditProductFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

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
        category_id: product.categories[0]?.id.toString(),
        original_price: product.original_price,
        selling_price: product.selling_price,
        inventory_count: product.inventory_count,
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

  const handleEditProduct = useCallback(
    async (productId: string, productData: z.infer<typeof productSchema>) => {
      const updatedProduct = await call(
        () => updateProductApi(productId, productData, user?.accessToken),
        {
          errorMessage: "Failed to update product",
        }
      );
      if (updatedProduct) {
        setProducts((prev) =>
          prev.map((product) => (product.id === productId ? updatedProduct : product))
        );
        setIsEditProductFormOpen(false);
        setEditingProduct(null);
      }
    },
    [user?.accessToken, call]
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

  const openEditForm = useCallback((product: Product) => {
    setEditingProduct(product);
    setIsEditProductFormOpen(true);
  }, []);

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
    isEditProductFormOpen,
    setIsEditProductFormOpen,
    editingProduct,
    fetchProducts,
    handleAddProduct,
    handleEditProduct,
    handleDuplicateProduct,
    handleDeleteProduct,
    openEditForm,
  };
}
