"use client";

import type { Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "./data-table-view-options";
import { X } from "lucide-react";
import { cardStates } from "./data";
import { DataTableColumnFilter } from "./data-table-column-filter";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import DeleteCardAlertDialogContent from "../cards/DeleteCardAlertDialogContent";
import { Card } from "@/types/types";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered =
    table.getState().columnFilters.length > 0 || table.getState().globalFilter;

  const selectedRows = table.getSelectedRowModel().rows;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Search cards..."
          value={(table.getState().globalFilter as string) ?? ""}
          onChange={(event) => table.setGlobalFilter(event.target.value)}
          className="h-8 max-w-[300px] text-sm"
        />

        {table.getColumn("state") && (
          <DataTableColumnFilter
            column={table.getColumn("state")}
            title="Card State"
            options={cardStates}
          />
        )}

        {isFiltered && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              table.resetGlobalFilter();
              table.resetColumnFilters();
            }}
            className="h-8 px-2"
          >
            Reset
            <X className="h-4 w-4" />
          </Button>
        )}

        {selectedRows.length > 0 && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm" className="h-8">
                {`Delete ${selectedRows.length} card${selectedRows.length > 1 ? "s" : ""}`}
              </Button>
            </AlertDialogTrigger>

            <DeleteCardAlertDialogContent
              cards={selectedRows.map((row) => row.original as Card)}
              onDelete={() => table.resetRowSelection()}
            />
          </AlertDialog>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
