"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { useParams } from "next/navigation";
import { Spreadsheet } from "~/components/spreadsheet";
import { useTable } from "~/contexts/table-context";
import { api } from "~/trpc/react";

export default function Page() {
  const { tableId } = useParams<{ tableId: string }>();
  const { columns: tableColumns } = useTable();

  type SpreadsheetRow = { id: string } & Record<string, string>;
  const { data: rows = [] } = api.table.getRows.useQuery({ tableId });

  const columns: ColumnDef<SpreadsheetRow>[] = tableColumns.map((col) => ({
    accessorKey: col.id,
    header: col.name,
  }));

  return <Spreadsheet columns={columns} data={rows as SpreadsheetRow[]} />;
}
