"use client";

import { z } from "zod";
import { useState, useCallback, useEffect } from "react";

import { Category } from "@/types/catalogue/category/category";
import { categorySchema } from "@/schemas/catalogue/categories/CategorySchema";

import {
  createCategoryApi,
  deleteCategoryApi,
  fetchAllCategories,
} from "@/services/catalogue/category/category.api";

import { generateCopyName } from "@/utils/common";

import { useAuth } from "@/providers/AuthProvider";
import { useApiHandler } from "@/hooks/common/useApiHandler";

export function useCategoryManager() {
  const { user } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isAddCategoryFormOpen, setIsAddCategoryFormOpen] = useState(false);

  const { isLoading, error, call } = useApiHandler();

  const fetchCategories = useCallback(async () => {
    const response = await call(() => fetchAllCategories(user?.accessToken), {
      errorMessage: "Failed to load categories",
    });
    if (response) setCategories(response);
  }, [user?.accessToken, call]);

  const handleAddCategory = useCallback(
    async (newCategoryData: z.infer<typeof categorySchema>) => {
      const created = await call(
        () => createCategoryApi(newCategoryData, user?.accessToken),
        {
          errorMessage: "Failed to create category",
        }
      );
      if (created) {
        setCategories((prev) => [...prev, created]);
        setIsAddCategoryFormOpen(false);
      }
    },
    [user?.accessToken, call]
  );

  const handleDuplicateCategory = useCallback(
    async (category: Category) => {
      const { name, ...rest } = category;
      const duplicatedCategory = {
        ...rest,
        name: generateCopyName(
          name,
          categories.map((c) => c.name)
        ),
      };
      const created = await call(
        () => createCategoryApi(duplicatedCategory, user?.accessToken),
        {
          errorMessage: "Failed to duplicate category",
        }
      );
      if (created) {
        setCategories((prev) => [...prev, created]);
      }
    },
    [user?.accessToken, categories, call]
  );

  const handleDeleteCategory = useCallback(
    async (categoryId: string) => {
      const deleted = await call(
        () => deleteCategoryApi(categoryId, user?.accessToken),
        {
          errorMessage: "Failed to delete category",
          successMessage: "Category deleted successfully",
        }
      );
      if (deleted !== null) {
        setCategories((prev) =>
          prev.filter((category) => category.id !== categoryId)
        );
      }
    },
    [user?.accessToken, call]
  );

  useEffect(() => {
    if (user?.accessToken) {
      fetchCategories();
    }
  }, [user?.accessToken, fetchCategories]);

  return {
    categories,
    isLoading,
    error,
    isAddCategoryFormOpen,
    setIsAddCategoryFormOpen,
    handleAddCategory,
    handleDuplicateCategory,
    handleDeleteCategory,
  };
}
