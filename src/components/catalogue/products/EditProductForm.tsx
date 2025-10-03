"use client";

import * as React from "react";
import { useForm, Resolver } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { productSchema } from "@/schemas/catalogue/product/ProductSchema";
import { Product } from "@/types/catalogue/product/product";

interface EditProductFormProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onEditProduct: (productId: string, productData: z.infer<typeof productSchema>) => void;
  product: Product | null;
}

export function EditProductForm({
  isOpen,
  onOpenChange,
  onEditProduct,
  product,
}: EditProductFormProps) {
  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema) as Resolver<
      z.infer<typeof productSchema>
    >,
    defaultValues: {
      name: "",
      category: "",
      original_price: 0,
      selling_price: 0,
      inventory_count: 0,
    },
  });

  const onSubmit = (values: z.infer<typeof productSchema>) => {
    if (product) {
      onEditProduct(product.id, values);
      toast.success("Product Updated!", {
        description: `${values.name} has been updated successfully.`,
      });
    }
  };

  React.useEffect(() => {
    if (product && isOpen) {
      form.reset({
        name: product.name || "",
        category: product.category || "",
        original_price: product.original_price || 0,
        selling_price: product.selling_price || 0,
        inventory_count: product.inventory_count || 0,
      });
    } else if (!isOpen) {
      form.reset({
        name: "",
        category: "",
        original_price: 0,
        selling_price: 0,
        inventory_count: 0,
      });
    }
  }, [product, isOpen, form]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
          <DialogDescription>
            Update the product details.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Laptop Pro" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Electronics" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="original_price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Original Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="selling_price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Selling Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="inventory_count"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Inventory Count</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Update Product
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
