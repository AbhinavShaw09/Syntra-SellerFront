import { z } from "zod";
import { apiFetch } from "@/lib/api";
import { BakckendEndpoints } from "@/utils/endpoints";
import { Category } from "@/types/catalogue/category/category";
import { categorySchema } from "@/schemas/catalogue/categories/CategorySchema";

type CreateCategoryPayload = z.infer<typeof categorySchema>;

export const fetchAllCategories = async (
  token?: string
): Promise<Category[]> => {
  return await apiFetch<Category[]>(
    BakckendEndpoints.CATEGORY.LIST_SELLER_CATEGORIES,
    {
      token,
    }
  );
};

export const createCategoryApi = async (
  newCategoryData: CreateCategoryPayload,
  token?: string
): Promise<Category> => {
  const createdCategory = await apiFetch<Category>(
    BakckendEndpoints.CATEGORY.CREATE_SELLER_CATEGORIES,
    {
      method: "POST",
      body: newCategoryData,
      token,
    }
  );
  return createdCategory;
};

export const deleteCategoryApi = async (
  categoryId: string,
  token?: string
): Promise<void> => {
  await apiFetch<void>(
    `${BakckendEndpoints.CATEGORY.DELETE_SELLER_CATEGORIES}/${categoryId}/`,
    {
      method: "POST",
      token,
    }
  );
};
