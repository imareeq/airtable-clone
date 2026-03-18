"use client";

import { TableTabs } from "./table-tabs";
import { useParams } from "next/navigation";

export default function TableNav() {
  const params = useParams();

  const baseId = params.baseId as string;
  const tableId = params.tableId as string;

  return (
    <nav className="border-border bg-background flex h-9 items-end gap-0 border-b px-2">
      <TableTabs baseId={baseId} activeTableId={tableId} />
    </nav>
  );
}
