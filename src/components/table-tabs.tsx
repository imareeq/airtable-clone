"use client";

import { useRouter } from "next/navigation";
import { PlusIcon } from "@phosphor-icons/react";
import { cn } from "~/lib/utils";
import { api } from "~/trpc/react";
import { Button } from "./ui/button";
import { useBase } from "~/contexts/base-context";
import TableActionsDropdown from "./table-actions-dropdown";

interface TableTabsProps {
  activeTableId: string;
  baseId: string;
  isDarkBackground?: boolean;
}

export function TableTabs({
  activeTableId,
  baseId,
  isDarkBackground,
}: TableTabsProps) {
  const router = useRouter();
  const utils = api.useUtils();
  const base = useBase();
  const tables = base.tables;

  const createTable = api.table.create.useMutation({
    onSuccess: async (newTable) => {
      router.refresh();
      await utils.base.getById.invalidate({ baseId });
      const firstViewId = newTable.views?.[0]?.id;
      if (firstViewId) {
        router.push(`/${baseId}/${newTable.id}/${firstViewId}`);
      } else {
        router.push(`/${baseId}/${newTable.id}`);
      }
    },
  });

  const handleCreateTable = () => {
    createTable.mutate({
      baseId,
      name: `Table ${tables.length + 1}`,
    });
  };

  const inactiveTextColor = isDarkBackground
    ? "text-white/70 hover:text-white"
    : "text-muted-foreground hover:text-foreground hover:bg-muted-foreground/15";

  return (
    <>
      {tables.map((table) => {
        const isActive = table.id === activeTableId;
        const path = `/${baseId}/${table.id}`;

        return (
          <div
            key={table.id}
            className={cn(
              "relative -mb-px flex h-8 shrink-0 cursor-pointer items-center rounded-t-sm border border-b-0 text-[13px] transition-colors first:border-l-0",
              isActive
                ? "tab-active border-border bg-background text-foreground"
                : cn("border-transparent pr-3", inactiveTextColor),
            )}
          >
            <button
              onClick={() => router.push(path)}
              onMouseEnter={() => router.prefetch(path)}
              className="flex h-full cursor-pointer items-center pl-3"
            >
              <span>{table.name}</span>
            </button>
            {isActive && <TableActionsDropdown />}
          </div>
        );
      })}

      <div
        className={cn(
          "mx-1 h-4 w-px self-center",
          isDarkBackground ? "bg-white/20" : "bg-border",
        )}
      />

      <Button
        onClick={handleCreateTable}
        variant="ghost"
        disabled={createTable.isPending}
        className={cn(
          "z-100 flex h-8 shrink-0 items-center gap-1.5 px-3 text-[13px] opacity-75 transition-colors hover:bg-inherit hover:opacity-100 disabled:opacity-50",
        )}
      >
        <PlusIcon className="size-3" />
        <span>Add or import</span>
      </Button>
    </>
  );
}
