"use client";

import React from "react";
import useCoupons from "@/hooks/discounts/useCoupons";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import Loader from "@/components/shared/Loader";

const Coupons = () => {
  const { coupons, loading, error } = useCoupons();

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
        All Coupons
      </h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Code</TableHead>
            <TableHead>Discount Type</TableHead>
            <TableHead>Value</TableHead>
            <TableHead>Expiry Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {coupons.map((coupon) => (
            <TableRow key={coupon.id}>
              <TableCell>{coupon.code}</TableCell>
              <TableCell>{coupon.discountType}</TableCell>
              <TableCell>
                {coupon.discountType === "percentage"
                  ? `${coupon.value}%`
                  : `$${coupon.value.toFixed(2)}`}
              </TableCell>
              <TableCell>{coupon.expiryDate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Coupons;