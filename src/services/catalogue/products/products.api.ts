import { apiFetch } from "@/lib/api";
import { BakckendEndpoints } from "@/utils/endpoints";
import { Product } from "@/types/product";
import { z } from "zod";
import { productSchema } from "@/schemas/ProductSchema";

type CreateProductPayload = z.infer<typeof productSchema>;

export const fetchAllProducts = async (token?: string): Promise<Product[]> => {
  const response = await apiFetch<Product[]>(
    BakckendEndpoints.PRODUCT.LIST_SELLER_PRODUCTS,
    {
      token: token,
    }
  );
  return response;
};

export const createProductApi = async (
  newProductData: CreateProductPayload,
  token?: string
): Promise<Product> => {
  const createdProduct = await apiFetch<Product>(
    BakckendEndpoints.PRODUCT.CREATE_SELLER_PRODUCTS,
    {
      method: "POST",
      body: newProductData,
      token: token,
    }
  );
  return createdProduct;
};
