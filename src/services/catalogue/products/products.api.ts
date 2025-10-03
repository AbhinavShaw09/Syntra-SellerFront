import { z } from "zod";
import { apiFetch } from "@/lib/api";
import { BakckendEndpoints } from "@/utils/endpoints";
import { Product } from "@/types/catalogue/product/product";
import { productSchema } from "@/schemas/catalogue/product/ProductSchema";


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

export const updateProductApi = async (
  productId: string,
  productData: CreateProductPayload,
  token?: string
): Promise<Product> => {
  const updatedProduct = await apiFetch<Product>(
    `${BakckendEndpoints.PRODUCT.UPDATE_SELLER_PRODUCTS}${productId}/`,
    {
      method: "PATCH",
      body: productData,
      token: token,
    }
  );
  return updatedProduct;
};

export const deleteProductApi = async (
  productId: string,
  token?: string
): Promise<void> => {
  await apiFetch<void>(
    `${BakckendEndpoints.PRODUCT.DELETE_SELLER_PRODUCTS}/${productId}/`,
    {
      method: "POST",
      token: token,
    }
  );
} 
