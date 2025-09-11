import * as React from "react";
import { cn } from "../utils";

export const Table = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLTableElement>) => (
  <table
    className={cn("w-full caption-bottom text-sm", className)}
    {...props}
  />
);
Table.displayName = "Table";

export const TableHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLTableSectionElement>) => (
  <thead className={cn("[&_tr]:border-b", className)} {...props} />
);
TableHeader.displayName = "TableHeader";

export const TableBody = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLTableSectionElement>) => (
  <tbody className={cn("[&_tr:last-child]:border-0", className)} {...props} />
);
TableBody.displayName = "TableBody";

export const TableRow = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLTableRowElement>) => (
  <tr
    className={cn(
      "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
      className
    )}
    {...props}
  />
);
TableRow.displayName = "TableRow";

export const TableHead = ({
  className,
  ...props
}: React.ThHTMLAttributes<HTMLTableCellElement>) => (
  <th
    className={cn(
      "h-10 px-2 text-left align-middle font-medium text-muted-foreground",
      className
    )}
    {...props}
  />
);
TableHead.displayName = "TableHead";

export const TableCell = ({
  className,
  ...props
}: React.TdHTMLAttributes<HTMLTableCellElement>) => (
  <td className={cn("p-2 align-middle", className)} {...props} />
);
TableCell.displayName = "TableCell";
