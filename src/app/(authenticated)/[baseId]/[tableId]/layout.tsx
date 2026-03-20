import type { ReactNode } from "react";
import TableNav from "~/components/table-nav";
import { TableProvider } from "~/contexts/table-context";
import { api } from "~/trpc/server";

export default async function TableLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ baseId: string; tableId: string }>;
}) {
  const { tableId } = await params;
  const table = await api.table.getById({ tableId });

  return (
    <TableProvider table={table}>
      <div className="flex h-full flex-1 flex-col overflow-hidden bg-background">
        <TableNav />
        {children}
      </div>
    </TableProvider>
  );
}
