"use client";

import { TableTabs } from "./table-tabs";
import { useParams } from "next/navigation";
import { useBase } from "~/contexts/base-context";
import { cn } from "~/lib/utils";
import { getBaseAccentColorClass, isBaseColorLight } from "~/lib/color-utils";
import TableNavToolsDropdown from "./table-nav-tools-dropdown";

export default function TableNav() {
  const { tableId } = useParams<{ baseId: string; tableId: string }>();
  const base = useBase();

  const isDarkBackground = base?.color ? isBaseColorLight(base.color) : false;

  return (
    <nav
      className={cn(
        "border-border relative flex h-8 items-center justify-between gap-0 border-b pr-2",
        base?.color ? getBaseAccentColorClass(base.color) : "bg-background",
      )}
    >
      <div className="relative flex items-end">
        <TableTabs
          baseId={base.id}
          activeTableId={tableId}
          isDarkBackground={isDarkBackground}
        />
      </div>
      <TableNavToolsDropdown />
    </nav>
  );
}
