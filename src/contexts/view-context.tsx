"use client";
import { createContext, useContext } from "react";
import type { View } from "generated/prisma";

const ViewContext = createContext<View | null>(null);

export function ViewProvider({
  view,
  children,
}: {
  view: View;
  children: React.ReactNode;
}) {
  return <ViewContext.Provider value={view}>{children}</ViewContext.Provider>;
}

export function useView() {
  const ctx = useContext(ViewContext);
  if (!ctx) throw new Error("useView must be used within ViewProvider");
  return ctx;
}
