"use client";

import {
  PlusIcon,
  TableIcon,
  CalendarIcon,
  SquaresFourIcon,
  RowsIcon,
  ChartBarIcon,
  ListIcon,
  TextAlignLeftIcon,
  KanbanIcon,
  FlowArrowIcon,
  ArticleIcon,
  SquareSplitHorizontalIcon,
} from "@phosphor-icons/react";
import { useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Badge } from "./ui/badge";
import { useTable } from "~/contexts/table-context";
import { useParams, useRouter } from "next/navigation";
import { cn } from "~/lib/utils";
import { api } from "~/trpc/react";

const VIEW_TYPES = [
  {
    label: "Grid",
    icon: <TableIcon className="size-4 text-blue-500" />,
    on: false,
  },
  {
    label: "Calendar",
    icon: <CalendarIcon className="size-4 text-orange-500" />,
    on: false,
  },
  {
    label: "Gallery",
    icon: <SquaresFourIcon className="size-4 text-purple-500" />,
    on: false,
  },
  {
    label: "Kanban",
    icon: <KanbanIcon className="size-4 text-green-600" />,
    on: false,
  },
  {
    label: "Timeline",
    icon: <RowsIcon className="size-4 text-red-500" />,
    on: false,
  },
  {
    label: "List",
    icon: <ListIcon className="size-4 text-teal-500" />,
    on: false,
  },
  {
    label: "Gantt",
    icon: <FlowArrowIcon className="size-4 text-cyan-500" />,
    on: false,
  },
  { separator: true },
  {
    label: "Form",
    icon: <ArticleIcon className="size-4 text-pink-500" />,
    on: false,
  },
  { separator: true },
  {
    label: "Section",
    icon: <SquareSplitHorizontalIcon className="size-4 text-pink-500" />,
    on: false,
  },
] as const;

export function ViewSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const [search, setSearch] = useState("");
  const { views } = useTable();
  const { baseId, tableId, viewId } = useParams<{
    baseId: string;
    tableId: string;
    viewId: string;
  }>();
  const router = useRouter();
  const utils = api.useUtils();

  const createView = api.view.create.useMutation({
    onSuccess: async (newView) => {
      await utils.view.getById.invalidate();
      router.push(`/${baseId}/${tableId}/${newView.id}`);
      router.refresh();
    },
  });

  const filteredViews = views.filter((view) =>
    view.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <Sidebar className="bg-background duration-200" {...props}>
      <SidebarContent className="gap-2 p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <PlusIcon className="size-4" />
                  Create new...
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="right"
                align="start"
                className="w-60 p-3"
              >
                {VIEW_TYPES.map((type, i) =>
                  "separator" in type ? (
                    <DropdownMenuSeparator key={i} />
                  ) : (
                    <DropdownMenuItem
                      key={type.label}
                      disabled={type.on}
                      className="flex items-center gap-2.5 rounded-md p-2 text-[13px]"
                      onClick={() => {
                        if (type.on) return;
                        if (type.label !== "Grid") return;
                        createView.mutate({
                          tableId,
                          name: `${type.label} View`,
                        });
                      }}
                    >
                      {type.icon}
                      <span className="flex-1">{type.label}</span>
                      {type.on && (
                        <Badge
                          variant="secondary"
                          className="rounded-full bg-blue-100 px-2 py-0.5 text-[11px] font-medium text-blue-600"
                        >
                          ✦ Team
                        </Badge>
                      )}
                    </DropdownMenuItem>
                  ),
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>

        <Input
          placeholder="Find a view"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-8 text-[13px]"
        />

        <SidebarMenu>
          {filteredViews.length === 0 ? (
            <p className="text-muted-foreground px-2 py-4 text-center text-[13px]">
              No views found
            </p>
          ) : (
            filteredViews.map((view) => {
              const isActive = view.id === viewId;
              return (
                <SidebarMenuItem key={view.id}>
                  <SidebarMenuButton
                    onClick={() =>
                      router.push(`/${baseId}/${tableId}/${view.id}`)
                    }
                    className={cn(
                      "text-[13px]",
                      isActive &&
                        "bg-muted-foreground/10 text-[13px] font-medium",
                    )}
                  >
                    <TableIcon className="text-primary size-4.5" />
                    {view.name}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })
          )}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
