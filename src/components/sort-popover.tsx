"use client";

import { useState, useRef, useEffect } from "react";
import {
  PlusIcon,
  XIcon,
  MagnifyingGlassIcon,
  TextAaIcon,
  HashStraightIcon,
  QuestionIcon,
  CaretDownIcon,
} from "@phosphor-icons/react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useTable } from "~/hooks/use-table";
import { ColumnType } from "generated/prisma";
import { columnTypeConfig } from "~/lib/column-type-config";
import type { Column } from "generated/prisma";
import { cn } from "~/lib/utils";
import { useParams } from "next/navigation";
import { useView } from "~/hooks/use-view";
import { useViewMutations } from "~/hooks/use-view-mutation";
import { useSortFilterState } from "~/contexts/sort-filter-state-context";

type SortDirection = "asc" | "desc";

type SortEntry = {
  column: Column;
  direction: SortDirection;
};

const columnTypeIcon: Record<ColumnType, React.ReactNode> = {
  [ColumnType.TEXT]: <TextAaIcon className="size-3.5 text-black/40" />,
  [ColumnType.NUMBER]: <HashStraightIcon className="size-3.5 text-black/40" />,
};

function InlineFieldSearch({
  availableColumns,
  onSelect,
}: {
  availableColumns: Column[];
  onSelect: (col: Column) => void;
}) {
  const [search, setSearch] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const filtered = availableColumns.filter((col) =>
    col.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div>
      <div className="border-border flex items-center gap-2 px-2 py-1">
        <MagnifyingGlassIcon className="text-primary size-4 shrink-0" />
        <input
          ref={inputRef}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Find a field"
          className="placeholder:text-muted-foreground w-full bg-transparent text-[13px] outline-none"
        />
      </div>
      <div className="max-h-56 overflow-y-auto">
        {filtered.length === 0 ? (
          <p className="text-muted-foreground px-4 py-4 text-center text-[13px]">
            No fields available
          </p>
        ) : (
          filtered.map((col) => (
            <Button
              variant="ghost"
              key={col.id}
              className="hover:bg-muted flex h-6.5 w-full items-center justify-start gap-3 text-left text-[13px]"
              onClick={() => onSelect(col)}
            >
              {columnTypeIcon[col.type]}
              <span className="font-medium">{col.name}</span>
            </Button>
          ))
        )}
      </div>
    </div>
  );
}

function FloatingFieldSearch({
  availableColumns,
  onSelect,
  onClose,
  position,
}: {
  availableColumns: Column[];
  onSelect: (col: Column) => void;
  onClose: () => void;
  position: { top: number; left: number };
}) {
  const [search, setSearch] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [onClose]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const filtered = availableColumns.filter((col) =>
    col.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <>
      <div
        ref={dropdownRef}
        className="border-border bg-background fixed z-100 w-105 overflow-hidden rounded-md border shadow-lg"
        style={{ top: position.top, left: position.left }}
      >
        <div className="flex w-full items-center gap-2 px-3 py-2">
          <MagnifyingGlassIcon className="size-3.5 shrink-0" />
          <input
            ref={inputRef}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Find a field..."
            className="w-full bg-transparent text-[13px] outline-none placeholder:text-black/30"
          />
        </div>
        <div className="max-h-48 overflow-y-auto py-1">
          {filtered.length === 0 ? (
            <p className="text-muted-foreground px-3 py-4 text-center text-[13px]">
              No fields available
            </p>
          ) : (
            filtered.map((col) => (
              <button
                key={col.id}
                className="hover:bg-muted flex w-full items-center gap-2.5 px-3 py-1.5 text-left text-[13px]"
                onClick={() => {
                  onSelect(col);
                  onClose();
                }}
              >
                {columnTypeIcon[col.type]}
                {col.name}
              </button>
            ))
          )}
        </div>
      </div>
    </>
  );
}

interface SortPopoverProps {
  children: React.ReactNode;
}

export function SortPopover({ children }: SortPopoverProps) {
  const table = useTable();
  const view = useView();
  const { baseId, tableId, viewId } = useParams<{
    baseId: string;
    tableId: string;
    viewId: string;
  }>();
  const { updateView } = useViewMutations(baseId, tableId);
  const [sorts, setSorts] = useState<SortEntry[]>([]);
  const [autoSort, setAutoSort] = useState(true);
  const [showFieldSearch, setShowFieldSearch] = useState(false);
  const addButtonRef = useRef<HTMLButtonElement>(null);
  const [fieldSearchPos, setFieldSearchPos] = useState<{
    top: number;
    left: number;
  } | null>(null);
  const { sortOpen, setSortOpen } = useSortFilterState();

  useEffect(() => {
    if (!view?.sortConfig) return;
    const config = view.sortConfig as {
      columnId: string;
      direction: SortDirection;
    }[];
    const initialSorts = config
      .map((s) => ({
        column: table?.columns.find((c) => c.id === s.columnId),
        direction: s.direction,
      }))
      .filter((s) => s.column != null) as SortEntry[];
    setSorts(initialSorts);
  }, [view?.sortConfig]);

  const toSortConfig = (entries: SortEntry[]) =>
    entries.map((s) => ({ columnId: s.column.id, direction: s.direction }));

  const addSort = (col: Column) => {
    const newSorts = [
      ...sorts,
      { column: col, direction: "asc" as SortDirection },
    ];
    setSorts(newSorts);
    updateView.mutate({ viewId, sortConfig: toSortConfig(newSorts) });
  };

  const removeSort = (columnId: string) => {
    const newSorts = sorts.filter((s) => s.column.id !== columnId);
    setSorts(newSorts);
    updateView.mutate({ viewId, sortConfig: toSortConfig(newSorts) });
  };

  const updateDirection = (columnId: string, direction: SortDirection) => {
    const newSorts = sorts.map((s) =>
      s.column.id === columnId ? { ...s, direction } : s,
    );
    setSorts(newSorts);
    updateView.mutate({ viewId, sortConfig: toSortConfig(newSorts) });
  };

  const sortedColumnIds = new Set(sorts.map((s) => s.column.id));
  const availableColumns = (table?.columns ?? []).filter(
    (col) => !sortedColumnIds.has(col.id),
  );

  const handleAddClick = () => {
    if (!addButtonRef.current) return;
    const rect = addButtonRef.current.getBoundingClientRect();
    setFieldSearchPos({ top: rect.bottom + 4, left: rect.left });
    setShowFieldSearch(true);
  };

  const numSorts = sorts.length;

  return (
    <>
      <Popover modal={false} open={sortOpen} onOpenChange={setSortOpen}>
        <PopoverTrigger asChild>{children}</PopoverTrigger>
        <PopoverContent
          align="end"
          sideOffset={6}
          className={cn(
            "relative h-auto min-h-48.75 gap-2 p-3 shadow-lg",
            numSorts === 0 ? "w-80" : "w-113",
          )}
          onInteractOutside={(e) => {
            if (showFieldSearch) e.preventDefault();
          }}
        >
          <div className="flex items-center justify-between border-b px-2 py-1">
            <p className="flex flex-row items-center gap-1 text-[13px] font-medium text-black/60">
              Sort by
              <QuestionIcon className="text-muted-foreground size-4" />
            </p>
            {numSorts === 0 && (
              <button className="text-muted-foreground hover:text-foreground text-[11px]">
                Copy from a view
              </button>
            )}
          </div>

          {numSorts === 0 ? (
            <InlineFieldSearch
              availableColumns={availableColumns}
              onSelect={addSort}
            />
          ) : (
            <>
              <div className="divide-border space-y-2 px-2 pt-1 pb-11">
                {sorts.map((sort) => {
                  const config = columnTypeConfig[sort.column.type];
                  const directionOptions = [
                    { value: "asc" as SortDirection, label: config.sortAsc },
                    { value: "desc" as SortDirection, label: config.sortDesc },
                  ];

                  return (
                    <div
                      key={sort.column.id}
                      className="flex items-center gap-2"
                    >
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="focus:text-foreground h-8 flex-1 justify-between gap-2 text-[13px] font-normal"
                          >
                            <span className="flex items-center gap-1.5">
                              {sort.column.name}
                            </span>
                            <span className="text-muted-foreground text-[11px]">
                              <CaretDownIcon />
                            </span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-61">
                          {(table?.columns ?? []).map((col) => (
                            <DropdownMenuItem
                              key={col.id}
                              className="gap-2 text-[13px]"
                              disabled={
                                sortedColumnIds.has(col.id) &&
                                col.id !== sort.column.id
                              }
                              onClick={() => {
                                const newSorts = sorts.map((s) =>
                                  s.column.id === sort.column.id
                                    ? { ...s, column: col }
                                    : s,
                                );
                                setSorts(newSorts);
                                updateView.mutate({
                                  viewId,
                                  sortConfig: toSortConfig(newSorts),
                                });
                              }}
                            >
                              {columnTypeIcon[col.type]}
                              {col.name}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 w-32 justify-between text-[13px] font-normal"
                          >
                            {
                              directionOptions.find(
                                (d) => d.value === sort.direction,
                              )?.label
                            }
                            <span className="text-muted-foreground text-[11px]">
                              <CaretDownIcon />
                            </span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-32">
                          {directionOptions.map((opt) => (
                            <DropdownMenuItem
                              key={opt.value}
                              className="text-[13px]"
                              onClick={() =>
                                updateDirection(sort.column.id, opt.value)
                              }
                            >
                              {opt.label}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>

                      <Button
                        variant="ghost"
                        size="default"
                        onClick={() => removeSort(sort.column.id)}
                        className="text-muted-foreground hover:text-foreground h-8 shrink-0 pt-0"
                      >
                        <XIcon className="size-4" />
                      </Button>
                    </div>
                  );
                })}

                <Button
                  ref={addButtonRef}
                  variant="ghost"
                  onClick={handleAddClick}
                  className="text-foreground/50 hover:text-foreground items-center gap-2 pl-0 text-[13px] hover:bg-inherit"
                >
                  <PlusIcon className="size-4" />
                  Add another sort
                </Button>
              </div>

              <div className="bg-muted-foreground/10 absolute bottom-0 left-0 flex h-11 w-full items-center justify-start gap-2 px-4 py-2.5">
                <Switch
                  checked={autoSort}
                  onCheckedChange={setAutoSort}
                  size="sm"
                  className="cursor-pointer"
                />
                <span className="text-[13px] text-black/60">
                  Automatically sort records
                </span>
              </div>
            </>
          )}
        </PopoverContent>
      </Popover>

      {showFieldSearch && fieldSearchPos && (
        <FloatingFieldSearch
          availableColumns={availableColumns}
          onSelect={addSort}
          onClose={() => setShowFieldSearch(false)}
          position={fieldSearchPos}
        />
      )}
    </>
  );
}
