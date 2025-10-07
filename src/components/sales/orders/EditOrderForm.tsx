"use client";

import * as React from "react";
import { useForm, Resolver } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { orderSchema } from "@/schemas/sales/OrderSchema";
import { Order } from "@/types/sales/order";

interface EditOrderFormProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onEditOrder: (orderId: string, orderData: z.infer<typeof orderSchema>) => void;
  order: Order | null;
}

export function EditOrderForm({
  isOpen,
  onOpenChange,
  onEditOrder,
  order,
}: EditOrderFormProps) {
  
  const form = useForm<z.infer<typeof orderSchema>>({
    resolver: zodResolver(orderSchema) as Resolver<
      z.infer<typeof orderSchema>
    >,
    defaultValues: {
      customerName: "",
      total: 0,
      status: "Pending",
    },
  });

  const onSubmit = (values: z.infer<typeof orderSchema>) => {
    if (order) {
      onEditOrder(order.id, values);
      toast.success("Order Status Updated!", {
        description: `Order status has been updated to ${values.status}.`,
      });
    }
  };

  React.useEffect(() => {
    if (order && isOpen) {
      form.reset({
        customerName: order.customerName || "",
        total: order.total || 0,
        status: order.status || "Pending",
      });
    } else if (!isOpen) {
      form.reset({
        customerName: "",
        total: 0,
        status: "Pending",
      });
    }
  }, [order, isOpen, form]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Order Status</DialogTitle>
          <DialogDescription>
            Update the order status to track fulfillment progress.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Order Status</FormLabel>
                  <Select 
                    key={field.value} 
                    onValueChange={field.onChange} 
                    value={field.value || "Pending"}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select order status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Shipped">Shipped</SelectItem>
                      <SelectItem value="Delivered">Delivered</SelectItem>
                      <SelectItem value="Cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Update Order Status
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
