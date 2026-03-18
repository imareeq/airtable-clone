"use client";

import { useState } from "react";
import BaseListFilters from "./base-list-filters";
import BaseCard from "./base-card";
import BaseListItem from "./base-list-item";
import { Separator } from "./ui/separator";
import { api } from "~/trpc/react";

export type ViewType = "list" | "grid";
export type FilterType = "today" | "7days" | "30days" | "anytime";

export default function BaseList() {
  const [view, setView] = useState<ViewType>("list");
  const [filter, setFilter] = useState<FilterType>("anytime");

  const { data: bases, isLoading, error } = api.base.getAll.useQuery();

  if (isLoading)
    return (
      <div className="text-muted-foreground text-xs">Loading bases...</div>
    );
  if (error)
    return (
      <div className="text-destructive text-xs">Error: {error.message}</div>
    );

  return (
    <div className="flex flex-col gap-4">
      <BaseListFilters
        view={view}
        onViewChange={setView}
        filter={filter}
        onFilterChange={setFilter}
      />

      {(!bases || bases.length === 0) && (
        <div className="text-muted-foreground px-2.5 text-xs">
          No bases found.
        </div>
      )}

      {view === "grid" && (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4">
          {bases?.map((base) => {
            const firstTable = base.tables?.[0];
            const firstView = firstTable?.views?.[0];

            if (!firstTable || !firstView) return null;

            return (
              <BaseCard
                key={base.id}
                name={base.name}
                id={base.id}
                color={base.color}
                lastUpdated={base.updatedAt}
                firstTableId={firstTable.id}
                firstViewId={firstView.id}
              />
            );
          })}
        </div>
      )}

      {view === "list" && bases?.length !== 0 && (
        <div className="flex w-full flex-col gap-2">
          <div className="flex w-full flex-col gap-1 pb-3">
            <div className="text-muted-foreground grid grid-cols-[1.5fr_1fr_1fr] items-center px-4 py-1.5 text-xs">
              <p>Name</p>
              <p className="">Last opened</p>
              <p>Workspace</p>
            </div>

            <Separator />
          </div>
          {bases?.map((base) => {
            const firstTable = base.tables?.[0];
            const firstView = firstTable?.views?.[0];

            if (!firstTable || !firstView) return null;

            return (
              <BaseListItem
                key={base.id}
                id={base.id}
                name={base.name}
                color={base.color}
                updatedAt={base.updatedAt}
                workspaceName={"My First Workspace"}
                firstTableId={firstTable.id}
                firstViewId={firstView.id}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
