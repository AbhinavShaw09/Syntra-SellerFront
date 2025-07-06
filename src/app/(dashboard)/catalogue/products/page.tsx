"use client";

import * as React from "react";
import { useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnFiltersState,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { z } from "zod";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { productSchema } from "@/schemas/ProductSchema";
import { Product } from "@/types/product";

// Import the new AddProductForm component
import { AddProductForm } from "@/components/products/AddProductForm";

const initialProducts: Product[] = [
  {
    id: "1",
    name: "Laptop Pro",
    category: "Electronics",
    price: 1200,
    stock: 50,
  },
  {
    id: "2",
    name: "Mechanical Keyboard",
    category: "Peripherals",
    price: 90,
    stock: 120,
  },
  {
    id: "3",
    name: "Wireless Mouse",
    category: "Peripherals",
    price: 45,
    stock: 200,
  },
  {
    id: "4",
    name: "Smartphone X",
    category: "Electronics",
    price: 800,
    stock: 75,
  },
  { id: "5", name: "Gaming Headset", category: "Audio", price: 70, stock: 90 },
  { id: "6", name: "Webcam HD", category: "Peripherals", price: 60, stock: 80 },
  {
    id: "7",
    name: "Monitor UltraWide",
    category: "Electronics",
    price: 450,
    stock: 30,
  },
  {
    id: "8",
    name: "Desk Chair Ergonomic",
    category: "Furniture",
    price: 300,
    stock: 40,
  },
  {
    id: "9",
    name: "External SSD 1TB",
    category: "Storage",
    price: 150,
    stock: 100,
  },
  {
    id: "10",
    name: "Bluetooth Speaker",
    category: "Audio",
    price: 50,
    stock: 150,
  },
  {
    id: "11",
    name: "Bluetooth Speaker",
    category: "Audio",
    price: 50,
    stock: 150,
  },
  {
    id: "12",
    name: "Bluetooth Speaker",
    category: "Audio",
    price: 50,
    stock: 150,
  },
  {
    id: "13",
    name: "Bluetooth Speaker",
    category: "Audio",
    price: 50,
    stock: 150,
  },
  {
    id: "14",
    name: "Bluetooth Speaker",
    category: "Audio",
    price: 50,
    stock: 150,
  },
  {
    id: "15",
    name: "Bluetooth Speaker",
    category: "Audio",
    price: 50,
    stock: 150,
  },
];

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: "Product Name",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "price",
    header: () => <div className="text-right">Price</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
      }).format(amount);
      return <div className="text-right">{formatted}</div>;
    },
  },
  {
    accessorKey: "stock",
    header: () => <div className="text-right">Stock</div>,
    cell: ({ row }) => (
      <div className="text-right">{row.getValue("stock")}</div>
    ),
  },
  // Add more columns or actions as needed
];

// --- Main Product Page Component ---
export default function ProductPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [isAddProductFormOpen, setIsAddProductFormOpen] = useState(false);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const table = useReactTable({
    data: products,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      columnFilters,
    },
  });

  const handleAddProduct = (newProductData: z.infer<typeof productSchema>) => {
    // In a real application, you'd send this to a backend API
    const newProduct: Product = {
      id: String(
        products.length > 0
          ? Math.max(...products.map((p) => parseInt(p.id))) + 1
          : 1
      ),
      ...newProductData,
    };
    setProducts((prevProducts) => [...prevProducts, newProduct]);
    setIsAddProductFormOpen(false);
    // The form reset is now handled within AddProductForm
  };

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
        Product Catalog
      </h1>

      {/* Table Controls and Add Button */}
      <div className="flex flex-col sm:flex-row items-center py-4 gap-4 justify-between">
        <Input
          placeholder="Filter products by name..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm w-full"
        />
        <Button
          onClick={() => setIsAddProductFormOpen(true)}
          className="w-full sm:w-auto"
        >
          Add Product
        </Button>
      </div>

      {/* Product Table */}
      <div className="rounded-md border overflow-x-auto">
        {" "}
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No products found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>

      {/* Add Product Dialog Form - Now a separate component */}
      <AddProductForm
        isOpen={isAddProductFormOpen}
        onOpenChange={setIsAddProductFormOpen}
        onAddProduct={handleAddProduct}
      />
    </div>
  );
}