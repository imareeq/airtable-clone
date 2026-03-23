"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { ColumnType } from "generated/prisma";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { ColumnHeader } from "~/components/column-header";
import { Spreadsheet } from "~/components/spreadsheet";
import { useTable } from "~/contexts/table-context";
import type { SpreadsheetRow } from "~/server/api/routers/table";
import { api } from "~/trpc/react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useInView } from "react-intersection-observer";

export type ActiveCell = {
  rowIndex: number;
  colIndex: number;
  mode: "selected" | "editing";
  initialValue?: string;
};

export default function Page() {
  const { tableId } = useParams<{ tableId: string }>();
  const [activeCell, setActiveCell] = useState<ActiveCell | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { columns: tableColumns } = useTable();
  const { ref: fetchNextRef, inView } = useInView();

  const { data, fetchNextPage } = api.table.getRows.useInfiniteQuery(
    { tableId },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      initialCursor: undefined,
    },
  );

  const rows = useMemo(
    () => data?.pages.flatMap((page) => page.rows) ?? [],
    [data],
  );

  const virtualizer = useVirtualizer({
    count: rows.length || 0,
    estimateSize: () => 32,
    getScrollElement: () => scrollContainerRef.current,
    overscan: 5,
  });

  const virtualRows = virtualizer.getVirtualItems();
  const visibleRows = virtualRows
    .map((virtualRow) => rows[virtualRow.index])
    .filter(Boolean);

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

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  return (
    <div
      onClick={() => setActiveCell(null)}
      className="bg-muted h-full w-full outline-none focus:outline-none"
    >
      <div
        ref={scrollContainerRef}
        className="relative h-full w-full overflow-auto"
      >
        <div
          style={{
            height: virtualizer.getTotalSize(),
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              transform: `translateY(${virtualRows[0]?.start ?? 0}px)`,
            }}
          >
            <Spreadsheet
              columns={columns}
              data={visibleRows as SpreadsheetRow[]}
              activeCell={activeCell}
              setActiveCell={setActiveCell}
              fetchNextRef={fetchNextRef}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
