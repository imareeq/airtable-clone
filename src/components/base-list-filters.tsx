"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Button } from "~/components/ui/button";
import { ListIcon, GridFourIcon, CaretDownIcon } from "@phosphor-icons/react";
import type { ViewType, FilterType } from "./base-list";
import { cn } from "~/lib/utils";

interface BaseListFiltersProps {
  view: ViewType;
  onViewChange: (view: ViewType) => void;
  filter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

const FILTER_LABELS: Record<FilterType, string> = {
  today: "Today",
  "7days": "In the past 7 days",
  "30days": "In the past 30 days",
  anytime: "Opened anytime",
};

export default function BaseListFilters({
  view,
  onViewChange,
  filter,
  onFilterChange,
}: BaseListFiltersProps) {
  return (
    <div className="flex w-full flex-row items-center justify-between">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="gap-2 text-base text-black/50">
            {FILTER_LABELS[filter]}
            <CaretDownIcon className="size-3.5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          {(Object.keys(FILTER_LABELS) as FilterType[]).map((key) => (
            <DropdownMenuItem key={key} onClick={() => onFilterChange(key)}>
              {FILTER_LABELS[key]}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon-lg"
          onClick={() => onViewChange("list")}
          className={cn(
            view === "list"
              ? "bg-muted-foreground/25 hover:bg-muted-foreground/25! opacity-100"
              : "opacity-50",
            "hover:bg-muted rounded-full hover:opacity-100",
          )}
        >
          <ListIcon className="size-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon-lg"
          onClick={() => onViewChange("grid")}
          className={cn(
            view === "grid"
              ? "bg-muted-foreground/25 hover:bg-muted-foreground/25! opacity-100"
              : "opacity-50",
            "hover:bg-muted rounded-full hover:opacity-100",
          )}
        >
          <GridFourIcon className="size-5" />
        </Button>
      </div>
    </div>
  );
}
