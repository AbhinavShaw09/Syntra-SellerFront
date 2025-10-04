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
import { categorySchema } from "@/schemas/catalogue/categories/CategorySchema";
import { Category } from "@/types/catalogue/category/category";

interface EditCategoryFormProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onEditCategory: (categoryId: string, categoryData: z.infer<typeof categorySchema>) => void;
  category: Category | null;
}

export function EditCategoryForm({
  isOpen,
  onOpenChange,
  onEditCategory,
  category,
}: EditCategoryFormProps) {
  const form = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema) as Resolver<
      z.infer<typeof categorySchema>
    >,
    defaultValues: {
      name: "",
      description: "",
      image_url: "",
    },
  });

  const onSubmit = (values: z.infer<typeof categorySchema>) => {
    if (category) {
      onEditCategory(category.id, values);
      toast.success("Category Updated!", {
        description: `${values.name} has been updated successfully.`,
      });
    }
  };

  React.useEffect(() => {
    if (category && isOpen) {
      form.reset({
        name: category.name || "",
        description: category.description || "",
        image_url: category.image_url || "",
      });
    } else if (!isOpen) {
      form.reset({
        name: "",
        description: "",
        image_url: "",
      });
    }
  }, [category, isOpen, form]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Category</DialogTitle>
          <DialogDescription>
            Update the category details.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Electronics" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., Devices, gadgets, and more"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., https://example.com/image.jpg"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Update Category
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
