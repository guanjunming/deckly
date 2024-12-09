"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "./data-table-column-header";
import { Card } from "@/types/types";
import { formatDate, formatDateTime } from "@/lib/utils";
import { cardStates } from "./data";

export const columns: ColumnDef<Card>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="pr-2">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          onClick={(event) => event.stopPropagation()}
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="pr-2">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          onClick={(event) => event.stopPropagation()}
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "state",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Card State" />
    ),
    cell: ({ row }) => {
      return (
        <div className="text-center">
          {
            cardStates.find((state) => state.value === row.getValue("state"))
              ?.label
          }
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "front",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Question" />
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
      <DataTableColumnHeader column={column} title="Answer" />
    ),
    cell: ({ row }) => {
      return (
        <div className="max-w-[200px] truncate">{row.getValue("back")}</div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created" />
    ),
    cell: ({ row }) => {
      return (
        <div className="truncate">
          {formatDateTime(row.getValue("createdAt"))}
        </div>
      );
    },
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Modified" />
    ),
    cell: ({ row }) => {
      return (
        <div className="truncate">
          {formatDateTime(row.getValue("updatedAt"))}
        </div>
      );
    },
  },
  {
    accessorKey: "dueDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Due" />
    ),
    cell: ({ row }) => {
      return (
        <div className="text-center">
          {row.getValue("dueDate") === null
            ? "(new)"
            : formatDateTime(row.getValue("dueDate"))}
        </div>
      );
    },
  },
  {
    accessorKey: "interval",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Interval" />
    ),
    cell: ({ row, getValue }) => {
      return (
        <div className="text-center">
          {getValue<number>() > 0
            ? `${getValue<number>()} day${getValue<number>() > 1 ? "s" : ""}`
            : row.getValue("state") === "NEW"
              ? "(new)"
              : "(learning)"}
        </div>
      );
    },
  },
  {
    accessorKey: "easeFactor",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ease" />
    ),
    cell: ({ row }) => {
      return (
        <div className="text-center">
          {row.getValue("state") === "NEW"
            ? "(new)"
            : `${Math.round(row.getValue<number>("easeFactor") * 100)}%`}
        </div>
      );
    },
  },
];
