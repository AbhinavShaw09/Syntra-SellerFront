"use client";

import React from "react";
import { Category } from "@/types/catalogue/category/category";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface CategoryCardListProps {
  data: Category[];
  onDeleteCategoryClick: (id: string) => void;
  onDuplicateCategoryClick: (category: Category) => void;
  onAddCategoryClick: () => void;
}

export const CategoryCardList: React.FC<CategoryCardListProps> = ({
  data,
  onDeleteCategoryClick,
  onDuplicateCategoryClick,
  onAddCategoryClick,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={onAddCategoryClick}>Add Category</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs dark:*:data-[slot=card]:bg-card lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
        {data.map((category) => (
          <Card
            key={category.id}
            className="hover:shadow-md transition-shadow"
          >
            <CardHeader>
              <CardTitle>{category.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-muted-foreground">
                {category.description || "No description"}
              </p>
              <div className="flex gap-2 mt-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onDuplicateCategoryClick(category)}
                >
                  Duplicate
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => onDeleteCategoryClick(category.id)}
                >
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
