"use client";

import React from "react";
import { AddCouponForm } from "@/components/discounts/coupons/AddCouponForm";
import { CouponTable } from "@/components/discounts/coupons/CouponTable";
import NotFound from "../../not-found";
import Loader from "@/components/shared/Loader";
import { useCouponManager } from "@/hooks/discounts/useCouponManager";

export default function CouponPage() {
  const {
    coupons,
    isLoading,
    error,
    isAddCouponFormOpen,
    setIsAddCouponFormOpen,
    handleAddCoupon,
    handleDeleteCoupon,
    handleDuplicateCoupon,
  } = useCouponManager();

  if (isLoading) return <Loader />;
  if (error) return <NotFound />;

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
        All Coupons
      </h1>
      <CouponTable
        data={coupons}
        onAddCouponClick={() => setIsAddCouponFormOpen(true)}
        onDeleteCouponClick={handleDeleteCoupon}
        onDuplicateCouponClick={handleDuplicateCoupon}
      />
      <AddCouponForm
        isOpen={isAddCouponFormOpen}
        onOpenChange={setIsAddCouponFormOpen}
        onAddCoupon={handleAddCoupon}
      />
    </div>
  );
}