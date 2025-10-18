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
} from "@/components/ui/form";
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
      status: undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof orderSchema>) => {
    if (order) {
      onEditOrder(order.id, values);
      toast.success("Order Updated!", {
        description: `Order for ${values.customerName} has been updated successfully.`,
      });
    }
  };

  React.useEffect(() => {
    if (order && isOpen) {
      form.reset({
        customerName: order.customerName || "",
        total: order.total || 0,
        status: order.status || undefined,
      });
    } else if (!isOpen) {
      form.reset({
        customerName: "",
        total: 0,
        status: undefined,
      });
    }
  }, [order, isOpen, form]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Order</DialogTitle>
          <DialogDescription>
            Update the order details.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
            <Button type="submit" className="w-full">
              Update Order
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
