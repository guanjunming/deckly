"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTableColumnHeader } from "./data-table-column-header";
import { Card } from "@/types/types";
import { formatDate } from "@/lib/utils";

export const columns: ColumnDef<Card>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "Card State",
    accessorKey: "state",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Card State" />
    ),
  },
  {
    accessorKey: "front",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Front" />
    ),
    cell: ({ row }) => {
      return (
        <div className="max-w-[200px] truncate">{row.getValue("front")}</div>
      );
    },
  },
  {
    accessorKey: "back",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Back" />
    ),
    cell: ({ row }) => {
      return (
        <div className="max-w-[200px] truncate">{row.getValue("front")}</div>
      );
    },
  },
  {
    id: "created",
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created" />
    ),
    cell: ({ getValue }) => {
      return <div className="truncate">{formatDate(getValue<string>())}</div>;
    },
  },
  {
    id: "modified",
    accessorKey: "updatedAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Modified" />
    ),
    cell: ({ getValue }) => {
      return <div className="truncate">{formatDate(getValue<string>())}</div>;
    },
  },
  //   {
  //     id: "actions",
  //     cell: ({ row }) => {
  //       const payment = row.original;

  //       return (
  //         <DropdownMenu>
  //           <DropdownMenuTrigger asChild>
  //             <Button variant="ghost" className="h-8 w-8 p-0">
  //               <span className="sr-only">Open menu</span>
  //               <MoreHorizontal className="h-4 w-4" />
  //             </Button>
  //           </DropdownMenuTrigger>
  //           <DropdownMenuContent align="end">
  //             <DropdownMenuLabel>Actions</DropdownMenuLabel>
  //             <DropdownMenuItem
  //               onClick={() => navigator.clipboard.writeText(payment.id)}
  //             >
  //               Copy payment ID
  //             </DropdownMenuItem>
  //             <DropdownMenuSeparator />
  //             <DropdownMenuItem>View customer</DropdownMenuItem>
  //             <DropdownMenuItem>View payment details</DropdownMenuItem>
  //           </DropdownMenuContent>
  //         </DropdownMenu>
  //       );
  //     },
  //   },
];
