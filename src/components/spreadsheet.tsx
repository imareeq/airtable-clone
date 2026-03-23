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
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import { PlusIcon } from "@phosphor-icons/react";
import { api } from "~/trpc/react";
import { CreateColumnPopover } from "./create-column-popover";
import { toast } from "sonner";
import { useTable } from "~/contexts/table-context";
import { useRouter } from "next/navigation";
import SpreadsheetContextMenu from "./spreadsheet-context-menu";
import { ColumnType } from "generated/prisma";
import type { ActiveCell } from "~/app/(authenticated)/[baseId]/[tableId]/[viewId]/page";
import { isValidNumberInput, validateValue } from "~/lib/cell-utils";
import { useEditingCell } from "~/hooks/use-editing-cell";

interface SpreadsheetProps<TData extends { id: string }, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  activeCell: ActiveCell | null;
  setActiveCell: React.Dispatch<React.SetStateAction<ActiveCell | null>>;
}

export function Spreadsheet<
  TData extends { id: string; row_number: number },
  TValue,
>({
  columns,
  data,
  activeCell,
  setActiveCell,
}: SpreadsheetProps<TData, TValue>) {
  const [contextRowId, setContextRowId] = useState<string | null>(null);
  const [checkedRows, setCheckedRows] = useState<Set<string>>(new Set());
  const tableRef = useRef<HTMLTableElement>(null);
  const headerRowRef = useRef<HTMLTableRowElement>(null);
  const utils = api.useUtils();
  const router = useRouter();
  const table = useTable();

  const spreadsheet = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const rows = spreadsheet.getRowModel().rows;
  const visibleCols = spreadsheet.getAllColumns();

  const { editingValue, setEditingValue, validationError, setValidationError } =
    useEditingCell(activeCell, rows);

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
            e.preventDefault();

            setActiveCell((p) =>
              p ? { ...p, mode: "editing", initialValue: e.key } : null,
            );
          } else if (e.key === "Backspace" || e.key === "Delete") {
            e.preventDefault();
            setActiveCell((p) =>
              p ? { ...p, mode: "editing", initialValue: "" } : null,
            );
          }
      }
    },
    [activeCell, navigate],
  );

  const exitEditing = useCallback(
    (rowDelta = 0, colDelta = 0) => {
      setActiveCell({
        rowIndex: Math.max(
          0,
          Math.min(rows.length - 1, activeCell!.rowIndex + rowDelta),
        ),
        colIndex: Math.max(
          0,
          Math.min(visibleCols.length - 1, activeCell!.colIndex + colDelta),
        ),
        mode: "selected",
      });
      tableRef.current?.focus({ preventScroll: true });
    },
    [activeCell, rows.length, visibleCols.length],
  );

  const handleCellBlur = useCallback(() => {
    exitEditing();
  }, [exitEditing]);

  const handleCellKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        exitEditing();
      }
      if (e.key === "Enter") {
        e.preventDefault();
        exitEditing(1, 0);
      }
      if (e.key === "Tab") {
        e.preventDefault();
        e.shiftKey ? exitEditing(0, -1) : exitEditing(0, 1);
      }
    },
    [exitEditing],
  );

  const handleCellClick = useCallback((rowIndex: number, colIndex: number) => {
    tableRef.current?.focus({ preventScroll: true });
    setActiveCell({ rowIndex, colIndex, mode: "selected" });
  }, []);

  const handleCellDoubleClick = useCallback(
    (rowIndex: number, colIndex: number) => {
      setActiveCell({ rowIndex, colIndex, mode: "editing" });
    },
    [],
  );

  const createRow = api.table.createRow.useMutation({
    onSuccess: () => {
      void utils.table.getRows.invalidate({ tableId: table.id });
      router.refresh();
    },
    onError: (error) => {
      toast.error(`Failed to create row: ${error.message}`);
    },
  });

  const deleteRow = api.table.deleteRow.useMutation({
    onMutate: async ({ rowId }) => {
      await utils.table.getRows.cancel({ tableId: table.id });

      const previousData = utils.table.getRows.getInfiniteData({
        tableId: table.id,
      });

      utils.table.getRows.setInfiniteData({ tableId: table.id }, (old) => {
        if (!old) return old;
        return {
          ...old,
          pages: old.pages.map((page) => ({
            ...page,
            totalCount: page.totalCount - 1,
            rows: page.rows.filter((row) => row.id !== rowId),
          })),
        };
      });

      return { previousData };
    },
    onError: (error, _vars, context) => {
      if (context?.previousData) {
        utils.table.getRows.setInfiniteData(
          { tableId: table.id },
          context.previousData,
        );
      }
      toast.error(`Failed to delete row: ${error.message}`);
    },
    onSettled: () => {
      void utils.table.getRows.invalidate({ tableId: table.id });
    },
  });

  const updateCell = api.table.updateCell.useMutation({
    onMutate: async ({ rowId, columnId, value }) => {
      await utils.table.getRows.cancel({ tableId: table.id });

      const previousRows = utils.table.getRows.getInfiniteData({
        tableId: table.id,
      });

      utils.table.getRows.setInfiniteData({ tableId: table.id }, (old) => {
        if (!old) return old;
        return {
          ...old,
          pages: old.pages.map((page) => ({
            ...page,
            rows: page.rows.map((row) =>
              row.id === rowId ? { ...row, [columnId]: value } : row,
            ),
          })),
        };
      });

      return { previousRows };
    },
    onError: (error, _vars, context) => {
      if (context?.previousRows) {
        utils.table.getRows.setInfiniteData(
          { tableId: table.id },
          context.previousRows,
        );
      }
      toast.error(`Failed to update cell: ${error.message}`);
    },
    onSettled: () => {
      void utils.table.getRows.invalidate({ tableId: table.id });
    },
  });

  return (
    <SpreadsheetContextMenu
      onDeleteRow={() => {
        if (!contextRowId) return;
        deleteRow.mutate({ tableId: table.id, rowId: contextRowId });
      }}
    >
      <Table
        ref={tableRef}
        className="bg-background relative w-auto min-w-max table-fixed outline-none focus:outline-none"
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleTableKeyDown}
      >
        <TableHeader className="bg-background shadow-[0_1px_0_0_var(--border)]">
          {spreadsheet.getHeaderGroups().map((headerGroup) => (
            <TableRow
              ref={headerRowRef}
              key={headerGroup.id}
              className="hover:bg-background relative h-8"
              onContextMenu={(e) => e.stopPropagation()}
            >
              <TableHead className="border-border w-21! border-r text-center text-[12px] font-normal">
                <div className="flex w-full items-center justify-center pr-7.5">
                  <Checkbox
                    checked={
                      checkedRows.size === rows.length && rows.length > 0
                    }
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setCheckedRows(
                          new Set(rows.map((row) => row.original.id)),
                        );
                      } else {
                        setCheckedRows(new Set());
                      }
                    }}
                  />
                </div>
              </TableHead>
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className="hover:bg-muted text-foreground w-44 border-r px-2 text-[12px] font-normal"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </TableHead>
              ))}
              <TableHead className="border-border absolute left-full px-0">
                <CreateColumnPopover />
              </TableHead>
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {rows.length
            ? rows.map((row) => {
                const rowIndex = row.original.row_number - 1;
                return (
                  <TableRow
                    key={row.id}
                    className={cn(
                      "hover:bg-muted h-8",
                      checkedRows.has(row.original.id) && "bg-muted",
                    )}
                    data-state={row.getIsSelected() && "selected"}
                    onContextMenu={() => setContextRowId(row.original.id)}
                  >
                    <TableCell className="text-muted-foreground border-border group/row-cell w-21 border-l-0 text-center text-xs">
                      {!checkedRows.has(row.original.id) && (
                        <span className="flex w-full items-center justify-center pr-7.5 group-hover/row-cell:hidden">
                          {row.original.row_number}
                        </span>
                      )}
                      <div
                        className={cn(
                          "w-full items-center justify-center pr-7.5",
                          checkedRows.has(row.original.id)
                            ? "flex"
                            : "hidden group-hover/row-cell:flex",
                        )}
                      >
                        <Checkbox
                          checked={checkedRows.has(row.original.id)}
                          className="cursor-pointer"
                          onCheckedChange={(checked) => {
                            setCheckedRows((prev) => {
                              const next = new Set(prev);
                              if (checked) next.add(row.original.id);
                              else next.delete(row.original.id);
                              return next;
                            });
                          }}
                        />
                      </div>
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
                          onClick={() => {
                            tableRef.current?.focus({
                              preventScroll: true,
                            });
                            setActiveCell({
                              rowIndex,
                              colIndex,
                              mode: "selected",
                            });
                          }}
                          onDoubleClick={() =>
                            setActiveCell({
                              rowIndex,
                              colIndex,
                              mode: "editing",
                            })
                          }
                        >
                          {isSelected && (
                            <div
                              className="pointer-events-none absolute inset-0 z-30"
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

                          {isEditing ? (
                            <div className="relative h-full w-full">
                              <input
                                autoFocus
                                value={editingValue}
                                onChange={(e) => {
                                  const newValue = e.target.value;
                                  const columnType = (
                                    cell.column.columnDef.meta as {
                                      type: ColumnType;
                                    }
                                  )?.type;

                                  if (
                                    columnType === ColumnType.NUMBER &&
                                    !isValidNumberInput(newValue)
                                  ) {
                                    setValidationError("please enter a number");
                                  } else {
                                    setEditingValue(newValue);
                                    setValidationError(null);
                                  }
                                }}
                                onClick={() =>
                                  handleCellClick(rowIndex, colIndex)
                                }
                                onDoubleClick={() =>
                                  handleCellDoubleClick(rowIndex, colIndex)
                                }
                                onBlur={(e) => {
                                  const columnType = (
                                    cell.column.columnDef.meta as {
                                      type: ColumnType;
                                    }
                                  )?.type;
                                  const error = validateValue(
                                    e.target.value,
                                    columnType,
                                  );
                                  if (!error) {
                                    updateCell.mutate({
                                      tableId: table.id,
                                      rowId: row.original.id,
                                      columnId: cell.column.id,
                                      value: e.target.value,
                                    });
                                  }

                                  handleCellBlur();
                                }}
                                onKeyDown={(e) => {
                                  const columnType = (
                                    cell.column.columnDef.meta as {
                                      type: ColumnType;
                                    }
                                  )?.type;
                                  if (e.key === "Enter" || e.key === "Tab") {
                                    const value = (e.target as HTMLInputElement)
                                      .value;
                                    const error = validateValue(
                                      value,
                                      columnType,
                                    );
                                    if (error) {
                                      e.preventDefault();
                                      return;
                                    }
                                    updateCell.mutate({
                                      tableId: table.id,
                                      rowId: row.original.id,
                                      columnId: cell.column.id,
                                      value: value,
                                    });
                                  }
                                  handleCellKeyDown(e);
                                }}
                                className="absolute inset-0 z-20 h-full w-full bg-white px-2 text-[13px] outline-none"
                              />
                              {validationError && (
                                <div className="bg-bacgrkound text-foreground absolute top-full -left-px z-50 flex h-8 w-[calc(100%+2px)] items-center px-2 text-right text-xs text-[12px] shadow-lg">
                                  {validationError}
                                </div>
                              )}
                            </div>
                          ) : (
                            <div className="flex h-8 w-full items-center truncate px-2 text-[13px]">
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext(),
                              )}
                            </div>
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })
            : null}
          <TableRow
            className="hover:bg-transparent"
            onContextMenu={(e) => e.stopPropagation()}
          >
            <TableCell colSpan={columns.length + 1} className="border-l-0 p-0">
              <Button
                variant="ghost"
                className="hover:bg-muted hover:text-foreground flex h-8 w-full items-center justify-start rounded-none border-r border-b px-2 font-normal text-black/75"
                onClick={() => createRow.mutate({ tableId: table.id })}
              >
                <PlusIcon className="size-4" />
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </SpreadsheetContextMenu>
  );
}
