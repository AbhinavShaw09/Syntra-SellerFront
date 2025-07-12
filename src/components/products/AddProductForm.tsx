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
  import { productSchema } from "@/schemas/ProductSchema";

  interface AddProductFormProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    onAddProduct: (newProductData: z.infer<typeof productSchema>) => void;
  }

  export function AddProductForm({
    isOpen,
    onOpenChange,
    onAddProduct,
  }: AddProductFormProps) {
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
      onAddProduct(values);
      form.reset();
      toast.success("Product Added!", {
        description: `${values.name} has been added to the catalog.`,
      });
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
            <DialogTitle>Add New Product</DialogTitle>
            <DialogDescription>
              Fill in the details for the new product.
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
                        onChange={(e) => field.onChange(  (e.target.value))}
                        value={field.value === 0 ? "" : field.value}
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
                        onChange={(e) => field.onChange(  (e.target.value))}
                        value={field.value === 0 ? "" : field.value}
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
                        onChange={(e) => field.onChange(parseInt(e.target.value))}
                        value={field.value === 0 ? "" : field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Add Product
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    );
  }