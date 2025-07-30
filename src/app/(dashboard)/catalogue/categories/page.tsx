"use client";
import React from "react";

import NotFound from "@/app/not-found";
import Loader from "@/components/shared/Loader";
import { useCategoryManager } from "@/hooks/catalogue/categories/useCategoryManager";
import { CategoryCardList } from "@/components/catalogue/categories/CategoriesCardList";
import { AddCategoryForm } from "@/components/catalogue/categories/AddCategoryForm";

const Categories = () => {
  const {
    categories,
    isLoading,
    error,
    isAddCategoryFormOpen,
    setIsAddCategoryFormOpen,
    handleAddCategory,
    handleDuplicateCategory,
    handleDeleteCategory,
  } = useCategoryManager();

  if (isLoading) return <Loader />;
  if (error) return <NotFound />;
  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
        All Categories
      </h1>

      <CategoryCardList
        data={categories}
        onAddCategoryClick={() => setIsAddCategoryFormOpen(true)}
        onDeleteCategoryClick={handleDeleteCategory}
        onDuplicateCategoryClick={handleDuplicateCategory}
      />
      <AddCategoryForm
        isOpen={isAddCategoryFormOpen}
        onOpenChange={setIsAddCategoryFormOpen}
        onAddCategory={handleAddCategory}
      />
    </div>
  );
};

export default Categories;
