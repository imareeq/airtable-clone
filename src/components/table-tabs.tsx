"use client";

import { useRouter } from "next/navigation";
import { CaretDownIcon, PlusIcon } from "@phosphor-icons/react";
import { cn } from "~/lib/utils";
import { api } from "~/trpc/react";
import { Button } from "./ui/button";

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

  const { data: tables = [] } = api.table.getByBaseId.useQuery({ baseId });

  const createTable = api.table.create.useMutation({
    onSuccess: async (newTable) => {
      await utils.table.getByBaseId.invalidate({ baseId });
      router.push(`/${baseId}/${newTable.id}`);
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
    : "text-muted-foreground hover:text-foreground";

  return (
    <>
      {tables.map((table) => {
        const isActive = table.id === activeTableId;
        return (
          <button
            key={table.id}
            onClick={() => router.push(`/${baseId}/${table.id}`)}
            className={cn(
              "cursor-pointer relative flex h-8 shrink-0 items-center gap-1 rounded-t-sm border border-b-0 px-3 text-[13px] transition-colors first:border-l-0",
              isActive
                ? "border-border bg-background text-foreground after:bg-background after:absolute after:right-0 after:-bottom-px after:left-0 after:h-px"
                : cn("border-transparent", inactiveTextColor),
            )}
          >
            <span>{table.name}</span>
            {isActive && (
              <CaretDownIcon className="text-muted-foreground size-3" />
            )}
          </button>
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
