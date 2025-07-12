"use client";

import * as React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnFiltersState,
  getFilteredRowModel,
  getPaginationRowModel,
  Table as TanstackTable,
} from "@tanstack/react-table";

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
import { Product } from "@/types/product";
import Image from "next/image";
import { getImage } from "@/utils/image";

interface ProductTableProps {
  data: Product[];
  onAddProductClick: () => void;
}

const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: "Product Name",
    cell: ({ row }) => {
      const finalImageSrc: string = getImage(row.original.image_url)

      return (
        <div className="flex items-center gap-2">
          <Image
            src={finalImageSrc}
            alt={finalImageSrc}
            width={50}
            height={50}
            className="rounded-xl"
          />
          <div className="flex items-center justify-center flex-col">
            <div className="font-medium">{row.getValue("name")}</div>
            <div className="font-medium">{row.original.category}</div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "selling_price",
    header: () => <div className="text-right">Selling Price</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("selling_price"));
      const formatted = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
      }).format(amount);
      return <div className="text-right">{formatted}</div>;
    },
  },
  {
    accessorKey: "inventory_count",
    header: () => <div className="text-right">Stock</div>,
    cell: ({ row }) => (
      <div className="text-right">{row.getValue("inventory_count")}</div>
    ),
  },
];

export function ProductTable({ data, onAddProductClick }: ProductTableProps) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const table: TanstackTable<Product> = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      columnFilters,
    },
  });
  return (
    <>
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
        <Button onClick={onAddProductClick} className="w-full sm:w-auto cursor-pointer">
          Add Product
        </Button>
      </div>

      {/* Product Table */}
      <div className="rounded-xs border overflow-x-auto">
        <Table>
          <TableHeader className="bg-neutral-900">
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
          variant="ghost"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </>
  );
}
