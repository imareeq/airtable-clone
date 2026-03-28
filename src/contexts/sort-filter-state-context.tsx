"use client";

import { createContext, useContext, useState } from "react";

type SortFilterStateContextType = {
  filterOpen: boolean;
  setFilterOpen: (open: boolean) => void;
  sortOpen: boolean;
  setSortOpen: (open: boolean) => void;
};

const SortFilterStateContext = createContext<SortFilterStateContextType | null>(null);

export function SortFilterStateProvider({ children }: { children: React.ReactNode }) {
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  return (
    <SortFilterStateContext.Provider value={{ filterOpen, setFilterOpen, sortOpen, setSortOpen }}>
      {children}
    </SortFilterStateContext.Provider>
  );
}

export function useSortFilterState() {
  const ctx = useContext(SortFilterStateContext);
  if (!ctx) throw new Error("useToolbar must be used within ToolbarProvider");
  return ctx;
}