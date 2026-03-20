"use client";
import { createContext, useContext } from "react";
import type { Table, Column, View } from "generated/prisma";

export type TableWithDetails = Table & {
  columns: Column[];
  views: Pick<View, "id" | "name">[];
};

const TableContext = createContext<TableWithDetails | null>(null);

export function TableProvider({
  table,
  children,
}: {
  table: TableWithDetails;
  children: React.ReactNode;
}) {
  return (
    <TableContext.Provider value={table}>{children}</TableContext.Provider>
  );
}

export function useTable() {
  const ctx = useContext(TableContext);
  if (!ctx) throw new Error("useTable must be used within TableProvider");
  return ctx;
}
