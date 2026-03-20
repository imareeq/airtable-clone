"use client";

import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState, useCallback, useRef } from "react";
import { cn } from "~/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Checkbox } from "../ui/checkbox";

interface SpreadsheetProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

type ActiveCell = {
  rowIndex: number;
  colIndex: number;
  mode: "selected" | "editing";
};

export function Spreadsheet<TData, TValue>({
  columns,
  data,
}: SpreadsheetProps<TData, TValue>) {
  const [activeCell, setActiveCell] = useState<ActiveCell | null>(null);
  const tableRef = useRef<HTMLDivElement>(null);

  const spreadsheet = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const rows = spreadsheet.getRowModel().rows;
  const visibleCols = spreadsheet.getAllColumns();

  const navigate = useCallback(
    (rowDelta: number, colDelta: number) => {
      setActiveCell((prev) => {
        if (!prev) return null;
        return {
          rowIndex: Math.max(
            0,
            Math.min(rows.length - 1, prev.rowIndex + rowDelta),
          ),
          colIndex: Math.max(
            0,
            Math.min(visibleCols.length - 1, prev.colIndex + colDelta),
          ),
          mode: "selected",
        };
      });
    },
    [rows.length, visibleCols.length],
  );

  const handleTableKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!activeCell || activeCell.mode === "editing") return;
      switch (e.key) {
        case "ArrowUp":
          e.preventDefault();
          navigate(-1, 0);
          break;
        case "ArrowDown":
          e.preventDefault();
          navigate(1, 0);
          break;
        case "ArrowLeft":
          e.preventDefault();
          navigate(0, -1);
          break;
        case "ArrowRight":
          e.preventDefault();
          navigate(0, 1);
          break;
        case "Tab":
          e.preventDefault();
          e.shiftKey ? navigate(0, -1) : navigate(0, 1);
          break;
        case "Enter":
          e.preventDefault();
          setActiveCell((p) => (p ? { ...p, mode: "editing" } : null));
          break;
        case "Escape":
          setActiveCell(null);
          break;
        default:
          if (e.key.length === 1 && !e.metaKey && !e.ctrlKey) {
            setActiveCell((p) => (p ? { ...p, mode: "editing" } : null));
          }
      }
    },
    [activeCell, navigate],
  );

  return (
    <div
      ref={tableRef}
      tabIndex={0}
      onKeyDown={handleTableKeyDown}
      className="h-full w-full overflow-auto outline-none focus:outline-none"
    >
      <Table className="w-auto">
        <TableHeader className="bg-background sticky top-0 z-10">
          {spreadsheet.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="hover:bg-muted h-8">
              <TableHead className="border-border w-21! border-r text-center text-[12px] font-normal">
                <Checkbox />
              </TableHead>
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className="text-muted-foreground w-44 border-r px-2 text-[12px] font-normal"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {rows.length ? (
            rows.map((row, rowIndex) => (
              <TableRow
                key={row.id}
                className="h-8 hover:bg-[#f9f9f9]"
                data-state={row.getIsSelected() && "selected"}
              >
                <TableCell className="text-muted-foreground border-border group/row-cell w-21! border-l-0 px-2 text-xs">
                  <span className="group-hover/row-cell:hidden">
                    {rowIndex + 1}
                  </span>
                  <Checkbox className="hidden size-3.5 cursor-pointer accent-blue-500 group-hover/row-cell:block" />
                </TableCell>

                {row.getVisibleCells().map((cell, colIndex) => {
                  const isSelected =
                    activeCell?.rowIndex === rowIndex &&
                    activeCell?.colIndex === colIndex;
                  const isEditing =
                    isSelected && activeCell?.mode === "editing";

                  return (
                    <TableCell
                      key={cell.id}
                      className={cn(
                        "border-border relative w-44 border-r p-0",
                        isSelected && "z-10",
                      )}
                      onClick={() =>
                        setActiveCell({ rowIndex, colIndex, mode: "selected" })
                      }
                      onDoubleClick={() =>
                        setActiveCell({ rowIndex, colIndex, mode: "editing" })
                      }
                    >
                      {isSelected && (
                        <div
                          className="pointer-events-none absolute inset-0 z-10"
                          style={{
                            boxShadow: [
                              colIndex !== 0 &&
                                "inset 2px 0 0 0 var(--color-primary)",
                              rowIndex !== 0 &&
                                "inset 0 2px 0 0 var(--color-primary)",
                              "inset -2px 0 0 0 var(--color-primary)",
                              "inset 0 -2px 0 0 var(--color-primary)",
                            ]
                              .filter(Boolean)
                              .join(", "),
                          }}
                        />
                      )}

                      <div className="flex h-8 w-full items-center truncate px-2 text-[13px]">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </div>
                    </TableCell>
                  );
                })}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length + 2}
                className="text-muted-foreground h-24 text-center text-[13px]"
              >
                No results
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
