"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/providers/AuthProvider";
import { fetchAllCategories } from "@/services/catalogue/category/category.api";
import { Category } from "@/types/catalogue/category/category";

export function useCategories() {
  const { user } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadCategories = async () => {
      if (!user?.accessToken) return;
      
      setIsLoading(true);
      try {
        const data = await fetchAllCategories(user.accessToken);
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCategories();
  }, [user?.accessToken]);

  return { categories, isLoading };
}
