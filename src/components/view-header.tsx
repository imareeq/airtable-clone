"use client";

import {
  EyeSlashIcon,
  FunnelSimpleIcon,
  ArrowsDownUpIcon,
  MagnifyingGlassIcon,
  ListIcon,
  TableIcon,
  CaretDownIcon,
  ExportIcon,
  TextAlignJustifyIcon,
  PaintBucketIcon,
  ListBulletsIcon,
  UsersThreeIcon,
  ArrowRightIcon,
  PencilSimpleIcon,
  InfoIcon,
  CopyIcon,
  GearIcon,
  PrinterIcon,
  TrashIcon,
  ArrowCircleDownIcon,
  CaretRightIcon,
} from "@phosphor-icons/react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";
import { Badge } from "./ui/badge";
import { useSidebar } from "./ui/sidebar";
import { useParams, useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import { useView } from "~/contexts/view-context";
import { useTable } from "~/contexts/table-context";

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

const VIEW_MENU_ITEMS = [
  {
    icon: <UsersThreeIcon className="size-4" />,
    label: "Collaborative view",
    description: "Editors and up can edit the view configuration",
    chevron: true,
    separator: false,
  },
  {
    icon: <ArrowRightIcon className="size-4" />,
    label: "Assign as personal view",
    pro: true,
    separator: true,
  },
  {
    icon: <PencilSimpleIcon className="size-4" />,
    label: "Rename view",
    separator: false,
  },
  {
    icon: <InfoIcon className="size-4" />,
    label: "Edit view description",
    separator: true,
  },
  {
    icon: <CopyIcon className="size-4" />,
    label: "Duplicate view",
    separator: false,
  },
  {
    icon: <GearIcon className="size-4" />,
    label: "Copy another view's configuration",
    separator: true,
  },
  {
    icon: <ArrowCircleDownIcon className="size-4" />,
    label: "Download CSV",
    separator: false,
  },
  {
    icon: <PrinterIcon className="size-4" />,
    label: "Print view",
    separator: false,
  },
  {
    icon: <TrashIcon className="size-4" />,
    label: "Delete view",
    destructive: true,
    separator: false,
  },
] as const;

export default function ViewHeader() {
  const { toggleSidebar } = useSidebar();
  const { baseId, tableId, viewId } = useParams<{
    baseId: string;
    tableId: string;
    viewId: string;
  }>();
  const router = useRouter();
  const utils = api.useUtils();
  const table = useTable();
  const view = useView();

  const deleteView = api.view.delete.useMutation({
    onSuccess: () => {
      utils.view.getById.invalidate({ viewId });
      router.push(`/${baseId}/${tableId}`);
      router.refresh();
    },
  });

  return (
    <div className="bg-background border-border flex h-12 w-full flex-row items-center justify-between border-b px-2">
      <div className="flex items-center gap-0.5">
        <Button
          variant="ghost"
          size="sm"
          className="text-muted-foreground hover:text-foreground h-7 px-1.5"
          onClick={toggleSidebar}
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
              <span>{view.name}</span>
              <CaretDownIcon size={11} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-88 space-y-2 p-3">
            {VIEW_MENU_ITEMS.map((item, i) => (
              <div key={item.label}>
                {"description" in item ? (
                  <DropdownMenuItem
                    key={item.label}
                    className="flex flex-col items-start gap-0.5 rounded-md p-2 text-[13px]"
                  >
                    <div className="flex w-full items-center gap-2">
                      {item.icon}
                      <span className="flex-1 font-medium">{item.label}</span>
                      {"chevron" in item && (
                        <CaretRightIcon className="text-muted-foreground size-3.5" />
                      )}
                    </div>
                    <span className="text-muted-foreground pl-6 text-[12px] font-normal">
                      {item.description}
                    </span>
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem
                    key={item.label}
                    className="flex items-center gap-2 rounded-md px-3 py-1.5 text-[13px]"
                    disabled={
                      item.label === "Delete view" && table.views.length === 1
                    }
                    onClick={() => {
                      if (item.label === "Delete view") {
                        deleteView.mutate({ viewId, tableId });
                      }
                    }}
                  >
                    {item.icon}
                    <span
                      className={`flex-1 ${"destructive" in item ? "text-rose-500" : ""}`}
                    >
                      {item.label}
                    </span>
                    {"pro" in item && (
                      <Badge
                        variant="secondary"
                        className="bg-primary/10 text-primary rounded-full px-2 py-0.5 text-[11px] font-medium"
                      >
                        ✦ Team
                      </Badge>
                    )}
                  </DropdownMenuItem>
                )}
                {item.separator && <DropdownMenuSeparator key={`sep-${i}`} />}
              </div>
            ))}
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
