"use client";
import { createContext, useContext } from "react";
import type { Base, Table } from "generated/prisma";

export type BaseWithTables = Base & {
  tables: Pick<Table, "id" | "name">[];
};

const BaseContext = createContext<BaseWithTables | null>(null);

export function BaseProvider({
  base,
  children,
}: {
  base: BaseWithTables;
  children: React.ReactNode;
}) {
  return <BaseContext.Provider value={base}>{children}</BaseContext.Provider>;
}

export function useBase() {
  const ctx = useContext(BaseContext);
  if (!ctx) throw new Error("useBase must be used within BaseProvider");
  return ctx;
}