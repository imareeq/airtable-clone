"use client";

import {
  PlusIcon,
  TableIcon,
  CalendarIcon,
  SquaresFourIcon,
  RowsIcon,
  ListIcon,
  KanbanIcon,
  FlowArrowIcon,
  ArticleIcon,
  SquareSplitHorizontalIcon,
  DotsThreeIcon,
  DotsSixVerticalIcon,
  StarIcon,
} from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";
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
import { useParams, useRouter } from "next/navigation";
import { cn } from "~/lib/utils";
import { CreateViewForm } from "./create-view-dialogue";
import { ViewContextMenu } from "./view-context-menu";
import { useViewMutations } from "~/hooks/use-view-mutation";
import { useTable } from "~/hooks/use-table";

const VIEW_TYPES = [
  {
    label: "Grid",
    icon: <TableIcon className="size-4 text-blue-500" />,
    pro: false,
  },
  {
    label: "Calendar",
    icon: <CalendarIcon className="size-4 text-orange-500" />,
    pro: false,
  },
  {
    label: "Gallery",
    icon: <SquaresFourIcon className="size-4 text-purple-500" />,
    pro: false,
  },
  {
    label: "Kanban",
    icon: <KanbanIcon className="size-4 text-green-600" />,
    pro: false,
  },
  {
    label: "Timeline",
    icon: <RowsIcon className="size-4 text-red-500" />,
    pro: true,
  },
  {
    label: "List",
    icon: <ListIcon className="size-4 text-teal-500" />,
    pro: false,
  },
  {
    label: "Gantt",
    icon: <FlowArrowIcon className="size-4 text-cyan-500" />,
    pro: true,
  },
  { separator: true },
  {
    label: "Form",
    icon: <ArticleIcon className="size-4 text-pink-500" />,
    pro: false,
  },
  { separator: true },
  {
    label: "Section",
    icon: <SquareSplitHorizontalIcon className="size-4 text-pink-500" />,
    pro: true,
  },
] as const;

export function ViewSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const [search, setSearch] = useState("");
  const [contextViewId, setContextViewId] = useState<string>("");
  const [renamingViewId, setRenamingViewId] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const table = useTable();
  const views = table?.views ?? [];
  const { baseId, tableId, viewId } = useParams<{
    baseId: string;
    tableId: string;
    viewId: string;
  }>();
  const router = useRouter();
  const renameInputRef = useRef<HTMLInputElement>(null);

  const { createView, deleteView, updateView } = useViewMutations(
    baseId,
    tableId,
  );

  // Focus and select when rename starts, using rAF to wait for context menu close animation
  useEffect(() => {
    if (!renamingViewId) return;
    const frame = requestAnimationFrame(() => {
      renameInputRef.current?.focus();
      renameInputRef.current?.select();
    });
    return () => cancelAnimationFrame(frame);
  }, [renamingViewId]);

  // Commit rename when clicking outside
  useEffect(() => {
    if (!renamingViewId) return;
    const handleMouseDown = (e: MouseEvent) => {
      if (
        renameInputRef.current &&
        !renameInputRef.current.contains(e.target as Node)
      ) {
        updateView.mutate({
          viewId: renamingViewId,
          name: renameInputRef.current.value,
        });
        setRenamingViewId(null);
      }
    };
    document.addEventListener("mousedown", handleMouseDown);
    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, [renamingViewId]);

  const filteredViews = views.filter((view) =>
    view.name.toLowerCase().includes(search.toLowerCase()),
  );

  const commitRename = (viewId: string, name: string) => {
    updateView.mutate({ viewId, name });
    setRenamingViewId(null);
  };

  return (
    <Sidebar className="bg-background duration-200" {...props}>
      <SidebarContent className="gap-2 p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu
              open={dropdownOpen}
              onOpenChange={(open) => {
                setDropdownOpen(open);
                if (!open) setShowCreateForm(false);
              }}
            >
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <PlusIcon className="size-4" />
                  Create new...
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="right"
                align="start"
                className={showCreateForm ? "w-100 p-4" : "w-60 p-3"}
              >
                {showCreateForm ? (
                  <CreateViewForm
                    onConfirm={(name) => {
                      createView.mutate({ tableId, name });
                      setDropdownOpen(false);
                      setShowCreateForm(false);
                    }}
                    onCancel={() => setShowCreateForm(false)}
                  />
                ) : (
                  <>
                    {VIEW_TYPES.map((type, i) =>
                      "separator" in type ? (
                        <DropdownMenuSeparator key={i} />
                      ) : (
                        <DropdownMenuItem
                          key={type.label}
                          className="flex items-center justify-start gap-2.5 rounded-md px-2 py-3 text-[13px]"
                          onSelect={(e) => {
                            e.preventDefault();
                            if (type.label === "Grid") setShowCreateForm(true);
                          }}
                        >
                          {type.icon}
                          <span className="flex-1">{type.label}</span>
                          {type.pro && (
                            <Badge
                              variant="secondary"
                              className="bg-primary/10 text-primary rounded-full px-2 py-0.5 text-[11px] font-medium"
                            >
                              ✦ Team
                            </Badge>
                          )}
                        </DropdownMenuItem>
                      ),
                    )}
                  </>
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

        <ViewContextMenu
          onDelete={() =>
            deleteView.mutate({ viewId: contextViewId!, tableId })
          }
          onRename={() => setRenamingViewId(contextViewId)}
          isLastView={views.length === 1}
        >
          <SidebarMenu>
            {filteredViews.map((view) => {
              const isActive = view.id === viewId;
              const isRenaming = renamingViewId === view.id;

              return (
                <SidebarMenuItem
                  key={view.id}
                  onContextMenu={() => setContextViewId(view.id)}
                  className="group/view-item"
                >
                  <SidebarMenuButton
                    tabIndex={isRenaming ? -1 : undefined}
                    onClick={() => {
                      if (!isRenaming) {
                        router.push(`/${baseId}/${tableId}/${view.id}`);
                      }
                    }}
                    className={cn(
                      "cursor-pointer items-center text-[13px]",
                      isActive && "bg-muted-foreground/10 font-medium",
                    )}
                  >
                    <span className="relative size-4.5 shrink-0">
                      <TableIcon className="text-primary absolute inset-0 size-4.5 transition-opacity group-hover/view-item:opacity-0" />
                      <StarIcon className="absolute inset-0 size-4 opacity-0 transition-opacity group-hover/view-item:opacity-100" />
                    </span>

                    {isRenaming ? (
                      <Input
                        ref={renameInputRef}
                        defaultValue={view.name}
                        className="h-5 px-1 text-[13px]"
                        onKeyDown={(e) => {
                          e.stopPropagation();
                          if (e.key === "Enter") {
                            commitRename(view.id, e.currentTarget.value);
                          }
                          if (e.key === "Escape") {
                            setRenamingViewId(null);
                          }
                        }}
                        onClick={(e) => e.stopPropagation()}
                      />
                    ) : (
                      <span className="flex-1 truncate">{view.name}</span>
                    )}

                    <span className="ml-auto flex items-center gap-0.5 opacity-0 transition-opacity group-hover/view-item:opacity-100">
                      <DotsThreeIcon
                        className="size-4"
                        onClick={(e) => {
                          e.stopPropagation();
                          setContextViewId(view.id);
                          e.currentTarget
                            .closest('[data-sidebar="menu-button"]')
                            ?.dispatchEvent(
                              new MouseEvent("contextmenu", {
                                bubbles: true,
                                clientX: e.clientX,
                                clientY: e.clientY,
                              }),
                            );
                        }}
                      />
                      <DotsSixVerticalIcon
                        className="size-4 cursor-grab opacity-50"
                        onClick={(e) => e.stopPropagation()}
                      />
                    </span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </ViewContextMenu>
      </SidebarContent>
    </Sidebar>
  );
}