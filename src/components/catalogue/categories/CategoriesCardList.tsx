"use client";

import React from "react";
import { Category } from "@/types/catalogue/category/category";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"; // Changed import
import { IconDotsVertical } from "@tabler/icons-react";

interface CategoryCardListProps {
  data: Category[];
  onDeleteCategoryClick: (id: string) => void;
  onDuplicateCategoryClick: (category: Category) => void;
  onEditCategoryClick: (category: Category) => void;
  onAddCategoryClick: () => void;
}

export const CategoryCardList: React.FC<CategoryCardListProps> = ({
  data,
  onDeleteCategoryClick,
  onDuplicateCategoryClick,
  onEditCategoryClick,
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
            className="hover:shadow-md transition-shadow relative" // Added relative
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">
                {category.name}
              </CardTitle>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="data-[state=open]:bg-muted text-muted-foreground cursor-pointer h-8 w-8"
                  >
                    <IconDotsVertical className="w-4 h-4" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40 z-50">
                  <DropdownMenuItem
                    onClick={() => onEditCategoryClick(category)}
                  >
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => onDuplicateCategoryClick(category)}
                  >
                    Duplicate
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => onDeleteCategoryClick(category.id)}
                    className="text-red-600 focus:text-red-600" // Added focus state
                  >
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-muted-foreground">
                {category.description || "No description"}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
