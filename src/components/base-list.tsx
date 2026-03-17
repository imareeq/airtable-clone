"use client";

import { useState } from "react";
import BaseListFilters from "./base-list-filters";
import BaseCard from "./base-card";
import BaseListItem from "./base-list-item";
import { Separator } from "./ui/separator";

export type ViewType = "list" | "grid";
export type FilterType = "today" | "7days" | "30days" | "anytime";

export default function BaseList() {
  const [view, setView] = useState<ViewType>("list");
  const [filter, setFilter] = useState<FilterType>("anytime");

  return (
    <div className="flex flex-col gap-4">
      <BaseListFilters
        view={view}
        onViewChange={setView}
        filter={filter}
        onFilterChange={setFilter}
      />

      {view === "grid" && (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4">
          <BaseCard
            name={"Untitled Base"}
            id={"123"}
            lastUpdated={new Date()}
          />
        </div>
      )}

      {view === "list" && (
        <div className="flex w-full flex-col gap-2">
          <div className="flex w-full flex-col gap-1 pb-3">
            <div className="text-muted-foreground grid grid-cols-[1.5fr_1fr_1fr] items-center px-4 py-1.5 text-xs">
              <p>Name</p>
              <p className="">Last opened</p>
              <p>Workspace</p>
            </div>

            <Separator />
          </div>
          <BaseListItem
            name={"Untitled Base"}
            lastUpdated={new Date()}
            workspaceName={"My workspace"}
          />
        </div>
      )}
    </div>
  );
}
