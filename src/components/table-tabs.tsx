"use client";

import { useRouter } from "next/navigation";
import { PlusIcon } from "@phosphor-icons/react";
import { cn } from "~/lib/utils";
import { Button } from "./ui/button";
import TableActionsDropdown from "./table-actions-dropdown";
import { useTableMutations } from "~/hooks/use-table-mutations";
import { useBase } from "~/hooks/use-base";
import { useState, useRef, useEffect } from "react";
import { Input } from "./ui/input";

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
  const base = useBase();
  const tables = base.tables;

  const { createTable, updateTable } = useTableMutations(base.id);
  const [renamingTableId, setRenamingTableId] = useState<string | null>(null);
  const [renamingName, setRenamingName] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (renamingTableId && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [renamingTableId]);

  const handleCreateTable = () => {
    createTable.mutate({
      baseId,
      name: `Table ${tables.length + 1}`,
    });
  };

  const handleRenameSubmit = (tableId: string) => {
    if (renamingName.trim() && renamingName !== tables.find(t => t.id === tableId)?.name) {
      updateTable.mutate({ tableId, name: renamingName.trim() });
    }
    setRenamingTableId(null);
  };

  const startRenaming = (tableId: string, currentName: string) => {
    setRenamingTableId(tableId);
    setRenamingName(currentName);
  };

  const inactiveTextColor = isDarkBackground
    ? "text-white/70 hover:text-white"
    : "text-muted-foreground hover:text-foreground hover:bg-muted-foreground/15";

  return (
    <>
      {tables.map((table) => {
        const isActive = table.id === activeTableId;
        const isRenaming = renamingTableId === table.id;
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
            {isRenaming ? (
              <Input
                ref={inputRef}
                value={renamingName}
                onChange={(e) => setRenamingName(e.target.value)}
                onBlur={() => handleRenameSubmit(table.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleRenameSubmit(table.id);
                  if (e.key === "Escape") setRenamingTableId(null);
                }}
                className="h-5 mx-3 w-32 bg-transparent px-1 outline-none"
              />
            ) : (
              <button
                onClick={() => router.push(path)}
                onMouseEnter={() => router.prefetch(path)}
                className="flex h-full cursor-pointer items-center pl-3"
              >
                <span>{table.name}</span>
              </button>
            )}
            {isActive && !isRenaming && (
              <TableActionsDropdown onRename={() => startRenaming(table.id, table.name)} />
            )}
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
          "flex h-8 shrink-0 items-center gap-1.5 px-3 text-[13px] opacity-75 transition-colors hover:bg-inherit hover:opacity-100 disabled:opacity-50",
        )}
      >
        <PlusIcon className="size-3" />
        <span>Add or import</span>
      </Button>
    </>
  );
}
