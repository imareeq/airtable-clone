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
import SeedDataButton from "~/components/seed-data-button";

export type ActiveCell = {
  rowIndex: number;
  colIndex: number;
  mode: "selected" | "editing";
  initialValue?: string;
};

export default function Page() {
  const table = useTable();
  const [activeCell, setActiveCell] = useState<ActiveCell | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { columns: tableColumns } = useTable();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    api.table.getRows.useInfiniteQuery(
      { tableId: table.id },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
        initialCursor: undefined,
      },
    );

  const rows = useMemo(
    () => data?.pages.flatMap((page) => page.rows) ?? [],
    [data],
  );

  const totalCount = data?.pages[0]?.totalCount ?? rows.length ?? 0;

  const virtualizer = useVirtualizer({
    count: totalCount,
    estimateSize: () => 32,
    getScrollElement: () => scrollContainerRef.current,
    overscan: 50,
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
    const virtualItems = virtualizer.getVirtualItems();
    if (virtualItems.length === 0 || !hasNextPage || isFetchingNextPage) return;

    const lastItem = virtualItems[virtualItems.length - 1]!;

    const threshold = rows.length - 20;

    if (lastItem.index >= threshold) {
      void fetchNextPage();
    }
  }, [
    virtualRows,
    rows.length,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  ]);

  return (
    <div
      onClick={() => setActiveCell(null)}
      className="bg-muted relative flex h-full w-full flex-col outline-none focus:outline-none"
    >
      <SeedDataButton tableId={table.id} />
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
            />
          </div>
        </div>
      </div>
      <div className="bg-background text-muted-foreground flex h-6 w-full items-center border-t px-3 text-xs">
        {totalCount.toLocaleString()} records
      </div>
    </div>
  );
}
