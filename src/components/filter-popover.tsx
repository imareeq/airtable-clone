"use client";

import { useEffect, useRef, useState } from "react";
import {
  PlusIcon,
  TrashIcon,
  TextAaIcon,
  HashStraightIcon,
  QuestionIcon,
  DotsSixVerticalIcon,
  CaretDownIcon,
} from "@phosphor-icons/react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import {
  Popover as ComboPopover,
  PopoverContent as ComboPopoverContent,
  PopoverTrigger as ComboPopoverTrigger,
} from "./ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useTable } from "~/hooks/use-table";
import { ColumnType } from "generated/prisma";
import { columnTypeConfig } from "~/lib/column-type-config";
import OmniIcon from "./omni-icon";
import { useBase } from "~/hooks/use-base";
import { getBaseColorClass } from "~/lib/color-utils";
import { cn } from "~/lib/utils";
import { isValidNumberInput } from "~/lib/cell-utils";
import { useView } from "~/hooks/use-view";
import { useViewMutations } from "~/hooks/use-view-mutation";
import { useParams } from "next/navigation";
import { useDebounceCallback } from "usehooks-ts";
import { useSortFilterState } from "~/contexts/sort-filter-state-context";

export type FilterCondition = {
  order: number;
  columnId: string;
  operator: string;
  value: string;
  conjunction?: "and" | "or";
};

const columnTypeIcon: Record<ColumnType, React.ReactNode> = {
  [ColumnType.TEXT]: <TextAaIcon className="text-foreground/70 size-3.5" />,
  [ColumnType.NUMBER]: (
    <HashStraightIcon className="text-foreground/70 size-3.5" />
  ),
};

function SearchCombobox<T>({
  items,
  value,
  onChange,
  getItemValue,
  getItemLabel,
  renderItem,
  renderSelected,
  placeholder = "Search...",
  emptyMessage = "No results found",
  className,
  width = "w-40",
}: {
  items: T[];
  value: T;
  onChange: (item: T) => void;
  getItemValue: (item: T) => string;
  getItemLabel: (item: T) => string;
  renderItem?: (item: T) => React.ReactNode;
  renderSelected?: (item: T) => React.ReactNode;
  placeholder?: string;
  emptyMessage?: string;
  className?: string;
  width?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <ComboPopover open={open} onOpenChange={setOpen}>
      <ComboPopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          role="combobox"
          className={cn(
            "h-8 justify-between rounded-none text-[13px] font-normal",
            width,
            className,
          )}
        >
          <span className="flex items-center gap-1.5 truncate">
            {renderSelected ? renderSelected(value) : getItemLabel(value)}
          </span>
          <CaretDownIcon className="text-muted-foreground text-[10px]" />
        </Button>
      </ComboPopoverTrigger>
      <ComboPopoverContent className={cn("p-0", width)} align="start">
        <Command>
          <CommandInput placeholder={placeholder} className="h-8 text-[13px]" />
          <CommandList>
            <CommandEmpty className="py-4 text-center text-[13px]">
              {emptyMessage}
            </CommandEmpty>
            <CommandGroup>
              {items.map((item) => (
                <CommandItem
                  key={getItemValue(item)}
                  value={getItemLabel(item)}
                  onSelect={() => {
                    onChange(item);
                    setOpen(false);
                  }}
                  className="gap-2 text-[13px]"
                >
                  {renderItem ? renderItem(item) : getItemLabel(item)}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </ComboPopoverContent>
    </ComboPopover>
  );
}

interface FilterPopoverProps {
  children: React.ReactNode;
}

export function FilterPopover({ children }: FilterPopoverProps) {
  const table = useTable();
  const base = useBase();
  const view = useView();
  const { viewId } = useParams<{
    baseId: string;
    tableId: string;
    viewId: string;
  }>();
  const { updateView } = useViewMutations(table.id, viewId);
  const { filterOpen, setFilterOpen } = useSortFilterState();
  const [inputValues, setInputValues] = useState<Record<number, string>>({});

  const conditions = (
    Array.isArray(view?.filterConfig) ? view.filterConfig : []
  ) as FilterCondition[];

  const columns = table?.columns ?? [];

  const saveConditions = (conditions: FilterCondition[]) => {
    updateView.mutate({
      viewId: view.id,
      filterConfig: conditions,
    });
  };

  const addCondition = () => {
    if (!columns[0]) return;
    const col = columns[0];
    const defaultOperator =
      columnTypeConfig[col.type].filterOperators[0]?.value ?? "contains";
    saveConditions([
      ...conditions,
      {
        order: conditions.length,
        columnId: col.id,
        operator: defaultOperator,
        value: "",
        conjunction: "and" as const,
      },
    ]);
  };

  const removeCondition = (order: number) => {
    setInputValues((prev) => {
      const next = { ...prev };
      delete next[order];
      return next;
    });
    saveConditions(conditions.filter((c) => c.order !== order));
  };

  const updateColumn = (order: number, columnId: string) => {
    const col = columns.find((c) => c.id === columnId)!;
    const defaultOperator =
      columnTypeConfig[col.type].filterOperators[0]?.value ?? "contains";
    saveConditions(
      conditions.map((c) =>
        c.order === order
          ? { ...c, columnId, operator: defaultOperator, value: "" }
          : c,
      ),
    );
  };

  const updateOperator = (order: number, operator: string) => {
    saveConditions(
      conditions.map((c) => (c.order === order ? { ...c, operator } : c)),
    );
  };

  const debouncedSave = useDebounceCallback(saveConditions, 500);

  const updateValue = (order: number, value: string) => {
    setInputValues((prev) => ({ ...prev, [order]: value }));
    debouncedSave(
      conditions.map((c) => (c.order === order ? { ...c, value } : c)),
    );
  };

  const updateConjunction = (order: number, conjunction: "and" | "or") => {
    saveConditions(
      conditions.map((c) => (c.order === order ? { ...c, conjunction } : c)),
    );
  };

  const numConditions = conditions.length;

  return (
    <Popover open={filterOpen} onOpenChange={setFilterOpen}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        align="end"
        sideOffset={6}
        className="w-147.5 gap-0 p-4 shadow-lg"
      >
        <h2 className="text-[13px] font-semibold text-black/50">Filter</h2>
        <div className="py-2">
          <div className="border-border flex items-center gap-2.5 rounded-md border px-3 py-2">
            <OmniIcon
              className={`size-5 ${getBaseColorClass(base.color, true)}`}
            />
            <span className="text-muted-foreground text-[13px]">
              Describe what you want to see
            </span>
          </div>
        </div>

        <div className="pt-4">
          {numConditions === 0 ? (
            <p className="text-muted-foreground flex items-center gap-1.5 text-[13px]">
              No filter conditions are applied
              <QuestionIcon className="size-4" />
            </p>
          ) : (
            <div className="space-y-2">
              <p className="text-muted-foreground text-[13px]">
                In this view, show records
              </p>
              <div className="space-y-1.5">
                {conditions.map((condition, i) => {
                  const col = columns.find((c) => c.id === condition.columnId)!;
                  const operators = columnTypeConfig[col.type].filterOperators;
                  const selectedOperator = operators.find(
                    (o) => o.value === condition.operator,
                  );
                  const requiresValue = selectedOperator?.requiresValue ?? true;

                  return (
                    <div key={condition.order} className="flex items-center">
                      <div className="flex items-center pr-2">
                        {i === 0 ? (
                          <span className="text-foreground/75 w-14 shrink-0 px-2 text-center text-[13px] font-medium">
                            Where
                          </span>
                        ) : (
                          <Select
                            value={condition.conjunction}
                            onValueChange={(val) =>
                              updateConjunction(
                                condition.order,
                                val as "and" | "or",
                              )
                            }
                          >
                            <SelectTrigger
                              size="lg"
                              className="w-14 text-[13px] font-medium text-black/60"
                            >
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent align="end">
                              <SelectItem value="and" className="text-[13px]">
                                and
                              </SelectItem>
                              <SelectItem value="or" className="text-[13px]">
                                or
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      </div>
                      <SearchCombobox
                        items={columns}
                        value={col}
                        onChange={(c) => updateColumn(condition.order, c.id)}
                        getItemValue={(c) => c.id}
                        getItemLabel={(c) => c.name}
                        renderItem={(c) => (
                          <>
                            {columnTypeIcon[c.type]}
                            {c.name}
                          </>
                        )}
                        renderSelected={(c) => <>{c.name}</>}
                        placeholder="Find a field"
                        emptyMessage="No fields found"
                        width="w-40"
                        className="rounded-l-sm"
                      />
                      <SearchCombobox
                        items={operators}
                        value={
                          operators.find(
                            (op) => op.value === condition.operator,
                          )!
                        }
                        onChange={(op) =>
                          updateOperator(condition.order, op.value)
                        }
                        getItemValue={(op) => op.value}
                        getItemLabel={(op) => op.label}
                        placeholder="Search..."
                        width="w-36"
                        className="-ml-px"
                      />
                      {requiresValue ? (
                        <Input
                          value={
                            inputValues[condition.order] ?? condition.value
                          }
                          onChange={(e) => {
                            const newValue = e.target.value;
                            if (
                              col.type === ColumnType.NUMBER &&
                              !isValidNumberInput(newValue)
                            )
                              return;
                            updateValue(condition.order, newValue);
                          }}
                          placeholder="Enter a value"
                          className="bg-background -ml-px h-8 flex-1 rounded-none text-[13px]"
                        />
                      ) : (
                        <div className="flex-1 -ml-px h-8 rounded-none border" />
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-muted-foreground border-px hover:text-foreground -ml-px h-8 w-8 shrink-0 rounded-none p-0"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          removeCondition(condition.order);
                        }}
                      >
                        <TrashIcon className="size-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-muted-foreground border-px hover:text-foreground -ml-px h-8 w-8 shrink-0 cursor-grab rounded-l-none rounded-r-sm p-0"
                      >
                        <DotsSixVerticalIcon className="size-4 shrink-0" />
                      </Button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between pt-2.5">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              className="text-foreground/70 hover:text-foreground h-7 gap-1.5 px-0 text-[13px] font-semibold hover:bg-transparent"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                addCondition();
              }}
              disabled={columns.length === 0}
            >
              <PlusIcon className="size-4" />
              Add condition
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-foreground/70 hover:text-foreground h-7 items-center gap-1.5 px-0 text-[13px] font-semibold hover:bg-transparent"
              disabled={columns.length === 0}
            >
              <PlusIcon className="size-4" />
              Add condition group
              <QuestionIcon className="size-3.5" />
            </Button>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-foreground/70 hover:text-foreground h-7 px-0 text-[13px] font-semibold hover:bg-transparent"
          >
            Copy from another view
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
