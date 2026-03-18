import type { ReactNode } from "react";
import TableNav from "~/components/table-nav";

export default async function TableLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ baseId: string; tableId: string }>;
}) {
  return (
    <div className="flex h-full flex-1 flex-col overflow-hidden">
      {children}
    </div>
  );
}
