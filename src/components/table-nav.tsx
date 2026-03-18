"use client";

import { TableTabs } from "./table-tabs";
import { useParams } from "next/navigation";
import { api } from "~/trpc/react";
import { cn } from "~/lib/utils";
import { getOppositeBaseColorClass, isBaseColorLight } from "~/lib/color-utils";
import TableNavToolsDropdown from "./table-nav-tools-dropdown";

export default function TableNav() {
  const params = useParams();

  const baseId = params.baseId as string;
  const tableId = params.tableId as string;

  const { data: base } = api.base.getById.useQuery({
    baseId: baseId,
  });

  const isDarkBackground = base?.color ? isBaseColorLight(base.color) : false;

  return (
    <nav
      className={cn(
        "border-border relative flex h-8 items-center justify-between gap-0 border-b pr-2",
      )}
    >
      <div
        className={cn(
          "absolute inset-0 opacity-25",
          base?.color ? getOppositeBaseColorClass(base.color) : "bg-background",
        )}
      />
      <div className="relative flex items-end">
        <TableTabs
          baseId={baseId}
          activeTableId={tableId}
          isDarkBackground={isDarkBackground}
        />
      </div>
      <TableNavToolsDropdown />
    </nav>
  );
}
