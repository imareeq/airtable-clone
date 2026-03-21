"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { ColumnType } from "generated/prisma";
import { useParams } from "next/navigation";
import { ColumnHeader } from "~/components/column-header";
import { Spreadsheet } from "~/components/spreadsheet";
import { useTable } from "~/contexts/table-context";
import type { SpreadsheetRow } from "~/server/api/routers/table";
import { api } from "~/trpc/react";

export default function Page() {
  const { tableId } = useParams<{ tableId: string }>();
  const { columns: tableColumns } = useTable();

  const { data: rows = [] } = api.table.getRows.useQuery({ tableId });

  const columns: ColumnDef<SpreadsheetRow>[] = tableColumns.map((col) => ({
    accessorKey: col.id,
    meta: { type: col.type },
    header: () => <ColumnHeader column={col} />,
    cell: ({ getValue }) => {
      const value = getValue<string>();
      if (col.type === ColumnType.NUMBER && value !== "" && value != null) {
        const num = Number(value);
        return isNaN(num) ? value : num.toLocaleString();
      }
      return value;
    },
  }));

  return <Spreadsheet columns={columns} data={rows as SpreadsheetRow[]} />;
}
