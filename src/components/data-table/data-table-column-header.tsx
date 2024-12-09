import { Column } from "@tanstack/react-table";
import { ChevronDown, ChevronsUpDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  return (
    <div className={cn("flex items-center", className)}>
      <Button
        variant="ghost"
        size="sm"
        className="flex h-8 w-full justify-between data-[state=open]:bg-accent"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        <span className="text-sm">{title}</span>

        {column.getIsSorted() === "desc" ? (
          <ChevronDown />
        ) : column.getIsSorted() === "asc" ? (
          <ChevronUp />
        ) : (
          <ChevronsUpDown />
        )}
      </Button>
    </div>
  );
}
