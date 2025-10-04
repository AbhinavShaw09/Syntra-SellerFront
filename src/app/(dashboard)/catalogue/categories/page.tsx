"use client";
import React from "react";

import NotFound from "@/app/not-found";
import Loader from "@/components/shared/Loader";
import { useCategoryManager } from "@/hooks/catalogue/categories/useCategoryManager";
import { CategoryCardList } from "@/components/catalogue/categories/CategoriesCardList";
import { AddCategoryForm } from "@/components/catalogue/categories/AddCategoryForm";
import { EditCategoryForm } from "@/components/catalogue/categories/EditCategoryForm";

const Categories = () => {
  const {
    categories,
    isLoading,
    error,
    isAddCategoryFormOpen,
    setIsAddCategoryFormOpen,
    isEditCategoryFormOpen,
    setIsEditCategoryFormOpen,
    editingCategory,
    handleAddCategory,
    handleEditCategory,
    handleDuplicateCategory,
    handleDeleteCategory,
    openEditForm,
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
        onEditCategoryClick={openEditForm}
      />
      <AddCategoryForm
        isOpen={isAddCategoryFormOpen}
        onOpenChange={setIsAddCategoryFormOpen}
        onAddCategory={handleAddCategory}
      />
      <EditCategoryForm
        isOpen={isEditCategoryFormOpen}
        onOpenChange={setIsEditCategoryFormOpen}
        onEditCategory={handleEditCategory}
        category={editingCategory}
      />
    </div>
  );
};

export default Categories;
