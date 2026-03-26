"use client";

import { useState } from "react";
import {
  TextAaIcon,
  HashStraightIcon,
  DotsSixVerticalIcon,
  QuestionIcon,
} from "@phosphor-icons/react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import { useTable } from "~/contexts/table-context";
import { ColumnType } from "generated/prisma";
import type { ReactNode } from "react";
import { useViewMutations } from "~/hooks/use-view-mutation";
import { useParams } from "next/navigation";
import { useView } from "~/hooks/use-view";

const columnTypeIcon: Record<ColumnType, ReactNode> = {
  [ColumnType.TEXT]: <TextAaIcon className="size-4 text-black/50" />,
  [ColumnType.NUMBER]: <HashStraightIcon className="size-4 text-black/50" />,
};

interface HideFieldsPopoverProps {
  children: React.ReactNode;
}

export function HideFieldsPopover({ children }: HideFieldsPopoverProps) {
  const [search, setSearch] = useState("");
  const table = useTable();
  const { baseId } = useParams<{ baseId: string }>();
  const view = useView();

  const [hiddenColumns, setHiddenColumns] = useState<string[]>(
    Array.isArray(view.hiddenColumns) ? (view.hiddenColumns as string[]) : [],
  );

  const { updateView } = useViewMutations(baseId, table.id);

  const filteredColumns = table.columns.filter((col) =>
    col.name.toLowerCase().includes(search.toLowerCase()),
  );

  const toggleColumn = (columnId: string) => {
    const next = hiddenColumns.includes(columnId)
      ? hiddenColumns.filter((id) => id !== columnId)
      : [...hiddenColumns, columnId];
    setHiddenColumns(next);
    updateView.mutate({ viewId: view.id, hiddenColumns: next });
  };

  const hideAll = () => {
    const all = table.columns.map((c) => c.id);
    setHiddenColumns(all);
    updateView.mutate({ viewId: view.id, hiddenColumns: all });
  };

  const showAll = () => {
    setHiddenColumns([]);
    updateView.mutate({ viewId: view.id, hiddenColumns: [] });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        align="end"
        className="w-80 px-4 shadow-lg"
        sideOffset={6}
      >
        <div className="flex items-center gap-2 border-b px-3">
          <Input
            placeholder="Find a field"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-background h-8 flex-1 border-none p-0 text-[13px] shadow-none focus-visible:ring-0"
            autoFocus
          />
          <QuestionIcon className="text-muted-foreground size-4 shrink-0" />
        </div>

        <div className="max-h-72 overflow-y-auto py-0">
          {filteredColumns.length === 0 ? (
            <p className="text-muted-foreground px-3 py-4 text-center text-[13px]">
              No fields found
            </p>
          ) : (
            filteredColumns.map((col) => {
              const isHidden = hiddenColumns.includes(col.id);
              return (
                <div
                  key={col.id}
                  className="group hover:bg-muted flex cursor-pointer items-center gap-2.5 px-3 py-1"
                >
                  <Switch
                    checked={!isHidden}
                    onCheckedChange={() => toggleColumn(col.id)}
                    size="xs"
                    className="data-[state=checked]:bg-primary cursor-pointer"
                  />
                  {columnTypeIcon[col.type]}
                  <span className="flex-1 text-[13px]">{col.name}</span>
                  <DotsSixVerticalIcon className="text-muted-foreground size-4 cursor-grab" />
                </div>
              );
            })
          )}
        </div>

        <div className="flex gap-2 px-2">
          <Button
            variant="secondary"
            size="sm"
            className="h-8 flex-1 text-[13px] text-black/70"
            onClick={hideAll}
          >
            Hide all
          </Button>
          <Button
            variant="secondary"
            size="sm"
            className="h-8 flex-1 text-[13px] text-black/70"
            onClick={showAll}
          >
            Show all
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
