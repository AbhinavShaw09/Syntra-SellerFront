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
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { IconDotsVertical } from "@tabler/icons-react";

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
import { Coupon } from "@/types/discounts/coupon";

interface CouponTableProps {
  data: Coupon[];
  onAddCouponClick: () => void;
  onDeleteCouponClick: (couponId: string) => void;
  onDuplicateCouponClick: (coupon: Coupon) => void;
}

function getColumns(
  onDeleteCouponClick: (couponId: string) => void,
  onDuplicateCouponClick: (coupon: Coupon) => void
): ColumnDef<Coupon>[] {
  return [
    {
      accessorKey: "code",
      header: "Code",
    },
    {
      accessorKey: "discountType",
      header: "Discount Type",
    },
    {
      accessorKey: "value",
      header: () => <div className="text-right">Value</div>,
      cell: ({ row }) => {
        const coupon = row.original;
        const formattedValue =
          coupon.discountType === "percentage"
            ? `${coupon.value}%`
            : new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(coupon.value);
        return <div className="text-right">{formattedValue}</div>;
      },
    },
    {
      accessorKey: "expiryDate",
      header: "Expiry Date",
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <div className="flex items-center justify-center">
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
              <DropdownMenuItem onClick={() => console.log("Edit")} className="cursor-pointer">
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onDuplicateCouponClick(row.original)}
                className="cursor-pointer"
              >
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => onDeleteCouponClick(row.original.id)}
                className="text-red-600 cursor-pointer"
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
  ];
}
export function CouponTable({
  data,
  onAddCouponClick,
  onDeleteCouponClick,
  onDuplicateCouponClick,
}: CouponTableProps) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const columns = React.useMemo(
    () => getColumns(onDeleteCouponClick, onDuplicateCouponClick),
    [onDeleteCouponClick, onDuplicateCouponClick]
  );

  const table: TanstackTable<Coupon> = useReactTable({
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
          placeholder="Filter coupons by code..."
          value={(table.getColumn("code")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("code")?.setFilterValue(event.target.value)
          }
          className="max-w-sm w-full"
        />
        <Button
          onClick={onAddCouponClick}
          className="w-full sm:w-auto cursor-pointer"
        >
          Add Coupon
        </Button>
      </div>

      {/* Coupon Table */}
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
                  No coupons found.
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
