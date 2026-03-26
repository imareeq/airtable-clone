import type { ReactNode } from "react";
import TableNav from "~/components/table-nav";
import { api, HydrateClient } from "~/trpc/server";

export default async function TableLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ baseId: string; tableId: string }>;
}) {
  const { tableId } = await params;
  void (await api.table.getById.prefetch({ tableId }));

  return (
    <HydrateClient>
      <div className="bg-background flex h-full w-full flex-1 flex-col overflow-hidden">
        <TableNav />
        {children}
      </div>
    </HydrateClient>
  );
}
