"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { ColumnType } from "generated/prisma";
import { useEffect, useMemo, useRef, useState } from "react";
import { ColumnHeader } from "~/components/column-header";
import { Spreadsheet } from "~/components/spreadsheet";
import type { SpreadsheetRow } from "~/server/api/routers/table";
import { api } from "~/trpc/react";
import { useVirtualizer } from "@tanstack/react-virtual";
import SeedDataButton from "~/components/seed-data-button";
import { useDebounceCallback } from "usehooks-ts";
import { ROW_LIMIT } from "~/services/table-service";
import { useSearch } from "~/contexts/table-search-context";
import { useView } from "~/hooks/use-view";
import { useTable } from "~/hooks/use-table";

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
  const utils = api.useUtils();
  const { search } = useSearch();
  const isJumping = useRef<boolean>(false);

  const {
    data,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
    isFetching,
  } = api.table.getRows.useInfiniteQuery(
    { tableId: table.id, search: search || undefined },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      getPreviousPageParam: (firstPage) => firstPage.prevCursor,
    },
  );

  const totalCount = data?.pages[0]?.totalCount ?? 0;

  const rows = useMemo(() => {
    const arr = new Array(totalCount).fill(null);
    data?.pages.forEach((page) => {
      page.rows.forEach((row) => {
        arr[row.row_number - 1] = row;
      });
    });
    return arr;
  }, [data, totalCount]);

  const virtualizer = useVirtualizer({
    count: totalCount,
    estimateSize: () => 32,
    getScrollElement: () => scrollContainerRef.current,
    overscan: 50,
  });

  const virtualRows = virtualizer.getVirtualItems();
  const visibleRows = useMemo(() => {
    return virtualRows.map((virtualRow) => {
      return (
        rows[virtualRow.index] ?? {
          id: `skeleton-${virtualRow.index}`,
          row_number: virtualRow.index + 1,
          isSkeleton: true,
        }
      );
    });
  }, [virtualRows, rows]);

  const view = useView();

  const hiddenColumns = Array.isArray(view?.hiddenColumns)
    ? (view.hiddenColumns as string[])
    : [];

  const columns: ColumnDef<SpreadsheetRow>[] = table.columns
    .filter((col) => !hiddenColumns.includes(col.id))
    .map((col) => ({
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

  const jumpToRow = async (
    rowNumber: number,
    options: { shouldScroll?: boolean; colIndex?: number } = {},
  ) => {
    const { shouldScroll = false, colIndex = 0 } = options;

    if (isJumping.current) return;

    if (rows[rowNumber - 1]) {
      if (shouldScroll) {
        virtualizer.scrollToIndex(rowNumber - 1, { align: "center" });
      }
      setActiveCell({ rowIndex: rowNumber - 1, colIndex, mode: "selected" });
      return;
    }

    isJumping.current = true;

    try {
      const offset = Math.floor((rowNumber - 1) / ROW_LIMIT) * ROW_LIMIT;
      const jumpPage = await utils.table.getRows.fetch({
        tableId: table.id,
        cursor: offset,
      });

      utils.table.getRows.setInfiniteData(
        { tableId: table.id },
        {
          pages: [jumpPage],
          pageParams: [offset],
        },
      );

      if (shouldScroll) {
        virtualizer.scrollToIndex(rowNumber - 1, { align: "center" });
      }

      setActiveCell({ rowIndex: rowNumber - 1, colIndex, mode: "selected" });
    } finally {
      isJumping.current = false;
    }
  };

  const debouncedJump = useDebounceCallback(
    (index: number) => {
      void jumpToRow(index);
    },
    150,
    { maxWait: 500 },
  );

  useEffect(() => {
    const virtualItems = virtualizer.getVirtualItems();
    if (virtualItems.length === 0 || isFetching) return;

    const firstVisibleIdx = virtualItems[0]!.index;
    const lastVisibleIdx = virtualItems[virtualItems.length - 1]!.index;
    const buffer = 20;

    if (!rows[firstVisibleIdx] && !isJumping.current) {
      debouncedJump(firstVisibleIdx + 1);
      return;
    }

    if (hasNextPage && !rows[lastVisibleIdx + buffer]) {
      void fetchNextPage();
    } else if (hasPreviousPage && !rows[firstVisibleIdx - buffer]) {
      void fetchPreviousPage();
    }
  }, [virtualRows, rows, isFetching]);

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
              totalRowCount={totalCount}
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
