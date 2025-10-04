import { Category } from "../category/category";

export type Product = {
  id: string;
  name: string;
  selling_price: number;
  original_price: number;
  inventory_count: number;
  image_url: string;
  categories: Category[];
};
