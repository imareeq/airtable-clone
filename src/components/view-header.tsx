"use client";

import {
  EyeSlashIcon,
  FunnelSimpleIcon,
  SquaresFourIcon,
  ArrowsDownUpIcon,
  MagnifyingGlassIcon,
  ListIcon,
  TableIcon,
  CaretDownIcon,
  ExportIcon,
  TextAlignJustifyIcon,
  PaintBucketIcon,
  ListBulletsIcon,
} from "@phosphor-icons/react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./ui/dropdown-menu";

const toolbarItems = [
  { icon: <EyeSlashIcon className="size-4" />, label: "Hide fields" },
  { icon: <FunnelSimpleIcon className="size-4" />, label: "Filter" },
  { icon: <ListBulletsIcon className="size-4" />, label: "Group" },
  { icon: <ArrowsDownUpIcon className="size-4" />, label: "Sort" },
  { icon: <PaintBucketIcon className="size-4" />, label: "Color" },
  { icon: <TextAlignJustifyIcon className="size-4" />, label: null },
  { icon: <ExportIcon className="size-4" />, label: "Share and sync" },
  { icon: <MagnifyingGlassIcon className="size-4" />, label: null },
];

export default function ViewHeader() {
  return (
    <div className="bg-background border-border flex h-12 w-full flex-row items-center justify-between border-b px-2">
      <div className="flex items-center gap-0.5">
        <Button
          variant="ghost"
          size="sm"
          className="text-muted-foreground hover:text-foreground h-7 px-1.5"
        >
          <ListIcon className="size-4 text-black/75" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="flex h-7 items-center gap-1.5 rounded-sm px-2 text-[13px] font-medium"
            >
              <TableIcon className="text-primary size-5" />
              <span>Grid view</span>
              <CaretDownIcon size={11} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48">
            <DropdownMenuItem className="text-xs">
              <TableIcon
                size={14}
                weight="fill"
                className="mr-2 text-blue-500"
              />
              Grid view
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex items-center gap-0.5">
        {toolbarItems.map((item, i) => (
          <Button
            key={i}
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-muted-foreground flex h-7 items-center gap-1.5 rounded-sm px-2 text-[13px] font-normal"
          >
            {item.icon}
            {item.label && <span>{item.label}</span>}
          </Button>
        ))}
      </div>
    </div>
  );
}
