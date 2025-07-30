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

interface AddCategoryFormProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onAddCategory: (newCategoryData: z.infer<typeof categorySchema>) => void;
}

export function AddCategoryForm({
  isOpen,
  onOpenChange,
  onAddCategory,
}: AddCategoryFormProps) {
  const form = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema) as Resolver<
      z.infer<typeof categorySchema>
    >,
    defaultValues: {
      name: "",
      description: "",
      image_url: "", // Add this if required by schema
    },
  });

  const onSubmit = (values: z.infer<typeof categorySchema>) => {
    console.log("Form submitted with values:", values);
    try {
      onAddCategory(values);
      form.reset();
      onOpenChange(false); // Close the dialog after successful submission
      toast.success("Category Added!", {
        description: `${values.name} has been added to your catalogue.`,
      });
    } catch (error) {
      console.error("Error adding category:", error);
      toast.error("Failed to add category", {
        description: "Please try again.",
      });
    }
  };

  React.useEffect(() => {
    if (!isOpen) {
      form.reset();
    }
  }, [isOpen, form]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Category</DialogTitle>
          <DialogDescription>
            Fill in the details for the new category.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={(e) => {
              form.handleSubmit(onSubmit)(e);
            }}
            className="grid gap-4 py-4"
          >
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

            <Button
              type="submit"
              className="w-full"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Adding..." : "Add Category"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
