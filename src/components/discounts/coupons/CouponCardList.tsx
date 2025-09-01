"use client";

import React from "react";
import { Coupon } from "@/types/discounts/coupon";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IconDotsVertical } from "@tabler/icons-react";

interface CouponCardListProps {
  data: Coupon[];
  onDeleteCouponClick: (id: string) => void;
  onDuplicateCouponClick: (coupon: Coupon) => void;
  onAddCouponClick: () => void;
}

export const CouponCardList: React.FC<CouponCardListProps> = ({
  data,
  onDeleteCouponClick,
  onDuplicateCouponClick,
  onAddCouponClick,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={onAddCouponClick}>Add Coupon</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs dark:*:data-[slot=card]:bg-card lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
        {data.map((coupon) => (
          <Card
            key={coupon.id}
            className="hover:shadow-md transition-shadow relative"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">
                {coupon.code}
              </CardTitle>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="data-[state=open]:bg-muted text-muted-foreground cursor-pointer"
                  >
                    <IconDotsVertical className="w-4 h-4" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" side="bottom">
                  <DropdownMenuItem
                    onClick={() => onDuplicateCouponClick(coupon)}
                    className="cursor-pointer"
                  >
                    Duplicate
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => onDeleteCouponClick(coupon.id)}
                    className="text-red-600 cursor-pointer"
                  >
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Type: {coupon.discountType}
                </p>
                <p className="text-sm text-muted-foreground">
                  Value: {coupon.discountType === "percentage" 
                    ? `${coupon.value}%` 
                    : `$${coupon.value.toFixed(2)}`}
                </p>
                <p className="text-sm text-muted-foreground">
                  Expires: {coupon.expiryDate}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
