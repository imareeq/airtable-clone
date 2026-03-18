"use client";

import { useRouter } from "next/navigation";
import { CaretDownIcon, PlusIcon } from "@phosphor-icons/react";
import { cn } from "~/lib/utils";
import { api } from "~/trpc/react";

interface TableTabsProps {
  activeTableId: string;
  baseId: string;
}

export function TableTabs({ activeTableId, baseId }: TableTabsProps) {
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

  return (
    <>
    
      {tables.map((table) => {
        const isActive = table.id === activeTableId;
        return (
          <button
            key={table.id}
            onClick={() => router.push(`/${baseId}/${table.id}`)}
            className={cn(
              "relative flex h-8 shrink-0 items-center gap-1 rounded-t-sm border border-b-0 px-3 text-xs transition-colors",
              isActive
                ? "border-border bg-background text-foreground after:bg-background after:absolute after:right-0 after:bottom-[-1px] after:left-0 after:h-px"
                : "text-muted-foreground hover:text-foreground border-transparent",
            )}
          >
            <span>{table.name}</span>
            {isActive && (
              <CaretDownIcon className="text-muted-foreground size-3" />
            )}
          </button>
        );
      })}

      <div className="bg-border mx-1 h-4 w-px self-center" />

      <button
        onClick={handleCreateTable}
        disabled={createTable.isPending}
        className="text-muted-foreground hover:text-foreground flex h-8 shrink-0 items-center gap-1.5 px-3 text-xs transition-colors disabled:opacity-50"
      >
        <PlusIcon className="size-3" />
        <span>Add or import</span>
      </button>
    </>
  );
}
