"use client";

import React from "react";
import NotFound from "@/app/not-found";
import Loader from "@/components/shared/Loader";
import { useCouponManager } from "@/hooks/discounts/useCouponManager";
import { CouponCardList } from "@/components/discounts/coupons/CouponCardList";
import { AddCouponForm } from "@/components/discounts/coupons/AddCouponForm";

const Coupons = () => {
  const {
    coupons,
    isLoading,
    error,
    isAddCouponFormOpen,
    setIsAddCouponFormOpen,
    handleAddCoupon,
    handleDuplicateCoupon,
    handleDeleteCoupon,
  } = useCouponManager();

  if (isLoading) return <Loader />;
  if (error) return <NotFound />;

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
        All Coupons
      </h1>
      <CouponCardList
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
};

export default Coupons;