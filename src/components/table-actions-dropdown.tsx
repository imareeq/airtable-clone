"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import {
  ArrowCircleUpIcon,
  PencilSimpleIcon,
  EyeSlashIcon,
  FadersHorizontalIcon,
  CopyIcon,
  GitBranchIcon,
  InfoIcon,
  LockIcon,
  XIcon,
  TrashIcon,
  CaretRightIcon,
  type Icon,
  CaretDownIcon,
} from "@phosphor-icons/react";
import { Button } from "./ui/button";
import { useTableMutations } from "~/hooks/use-table-mutations";
import { useTable } from "~/hooks/use-table";
import { useBase } from "~/hooks/use-base";

type TableMenuItem =
  | {
      label: string;
      icon: Icon;
      onClick?: () => void;
      hasArrow?: boolean;
      disabled?: boolean;
      destructive?: boolean;
      separator?: never;
    }
  | {
      separator: true;
    };

export default function TableActionsDropdown() {
  const table = useTable();
  const base = useBase();
  const tables = base.tables;
  const isOnlyTable = tables.length === 1;

  const { deleteTable } = useTableMutations(base.id);

  const menuItems: TableMenuItem[] = [
    { label: "Import data", icon: ArrowCircleUpIcon, hasArrow: true },
    { separator: true },
    { label: "Rename table", icon: PencilSimpleIcon },
    { label: "Hide table", icon: EyeSlashIcon },
    { label: "Manage fields", icon: FadersHorizontalIcon },
    { label: "Duplicate table", icon: CopyIcon },
    { separator: true },
    { label: "Configure date dependencies", icon: GitBranchIcon },
    { separator: true },
    { label: "Edit table description", icon: InfoIcon },
    { label: "Edit table permissions", icon: LockIcon },
    { separator: true },
    { label: "Clear data", icon: XIcon },
    {
      label: "Delete table",
      icon: TrashIcon,
      destructive: true,
      disabled: isOnlyTable,
      onClick: () => deleteTable.mutate({ tableId: table.id }),
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="xs"
          className="hover:bg-inherit focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
        >
          <CaretDownIcon className="size-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-82.5 gap-10 p-3">
        {menuItems.map((item, index) => {
          if ("separator" in item) {
            return <DropdownMenuSeparator key={index} />;
          }

          const ItemIcon = item.icon;

          return (
            <DropdownMenuItem
              key={item.label}
              disabled={item.disabled}
              onClick={item.onClick}
              className="flex items-center justify-between p-2"
            >
              <div className="flex items-center gap-2">
                <ItemIcon className="size-4" />
                <span className="text-[13px] text-black/75">{item.label}</span>
              </div>
              {item.hasArrow && (
                <CaretRightIcon className="text-muted-foreground size-3" />
              )}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
