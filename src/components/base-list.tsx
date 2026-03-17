"use client";

import { useState } from "react";
import BaseListFilters from "./base-list-filters";
import BaseCard from "./base-card";

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

      <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4">
        <BaseCard
          name={"Untitled Base"}
          id={"123"}
          lastUpdated={new Date()}
        />
      </div>
    </div>
  );
}
