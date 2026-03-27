"use client";

import {
  PencilSimpleIcon,
  CopyIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  DiceTwoIcon,
  LinkIcon,
  InfoIcon,
  LockIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  FunnelSimpleIcon,
  SquaresFourIcon,
  EyeSlashIcon,
  TrashIcon,
  TextAaIcon,
  type Icon,
  HashStraightIcon,
  CaretDownIcon,
} from "@phosphor-icons/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "~/components/ui/dropdown-menu";
import { cn } from "~/lib/utils";
import { ColumnType } from "generated/prisma";
import type { Column } from "generated/prisma";
import type { ReactNode } from "react";
import { Button } from "./ui/button";
import { useSpreadsheetMutations } from "~/hooks/use-spreadsheet-mutation";
import { useTable } from "~/hooks/use-table";
import { columnTypeConfig } from "~/lib/column-type-config";

const columnTypeIcon: Record<ColumnType, ReactNode> = {
  [ColumnType.TEXT]: <TextAaIcon className="size-4" />,
  [ColumnType.NUMBER]: <HashStraightIcon className="size-4" />,
};

type MenuItem =
  | {
      label: string;
      icon: Icon;
      onClick?: () => void;
      secondary?: ReactNode;
      destructive?: boolean;
      separator?: never;
    }
  | { separator: true };

export function ColumnHeader({ column }: { column: Column }) {
  const table = useTable();
  const { deleteCol } = useSpreadsheetMutations(table.id);
  const columnConfig = columnTypeConfig[column.type];

  const menuItems: MenuItem[] = [
    { label: "Edit field", icon: PencilSimpleIcon },
    { separator: true },
    { label: "Duplicate field", icon: CopyIcon },
    { label: "Insert left", icon: ArrowLeftIcon },
    { label: "Insert right", icon: ArrowRightIcon },
    { separator: true },
    { label: "Summarize field", icon: DiceTwoIcon },
    { label: "Write headline for field", icon: DiceTwoIcon },
    { separator: true },
    { label: "Copy field URL", icon: LinkIcon },
    { label: "Edit field description", icon: InfoIcon },
    {
      label: "Edit field permissions",
      icon: LockIcon,
      secondary: (
        <span className="text-primary flex items-center gap-1 rounded-full bg-[#c4ecff] px-2 py-0.5 text-[11px]">
          Team
        </span>
      ),
    },
    { separator: true },
    {
      label: columnConfig.sortAsc,
      icon: ArrowUpIcon,
    },
    {
      label: columnConfig.sortDesc,
      icon: ArrowDownIcon,
    },
    { separator: true },
    { label: "Filter by this field", icon: FunnelSimpleIcon },
    { label: "Group by this field", icon: SquaresFourIcon },
    { separator: true },
    { label: "Hide field", icon: EyeSlashIcon },
    {
      label: "Delete field",
      icon: TrashIcon,
      destructive: true,
      onClick: () => deleteCol.mutate({ columnId: column.id }),
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="group flex h-8 w-full items-center justify-start gap-1.5 pl-0 text-xs font-semibold outline-none"
        >
          {columnTypeIcon[column.type]}
          <span>{column.name}</span>

          <CaretDownIcon className="text-muted-foreground ml-auto size-3 opacity-0 transition-opacity group-hover:opacity-100" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-80 space-y-1 p-3">
        {menuItems.map((item, index) => {
          if ("separator" in item) {
            return <DropdownMenuSeparator key={index} />;
          }

          const ItemIcon = item.icon;

          return (
            <DropdownMenuItem
              key={item.label}
              onClick={item.onClick}
              className={cn(
                "flex items-center justify-between p-2 text-[13px]",
                item.destructive && "text-destructive focus:text-destructive",
              )}
            >
              <div className="flex items-center gap-3">
                <ItemIcon className="size-4" />
                <span className="text-xs text-black/80">{item.label}</span>
              </div>
              {item.secondary && <span>{item.secondary}</span>}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
