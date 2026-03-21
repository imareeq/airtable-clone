"use client";

import { PlusIcon, TableIcon } from "@phosphor-icons/react";
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
import { useTable } from "~/contexts/table-context";
import { useParams, useRouter } from "next/navigation";
import { cn } from "~/lib/utils";

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

  const filteredViews = views.filter((view) =>
    view.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <Sidebar
      className="bg-background duration-200"
      {...props}
    >
      <SidebarContent className="gap-2 p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Button variant="ghost" className="w-full justify-start gap-2">
                <PlusIcon className="size-4" />
                Create new...
              </Button>
            </SidebarMenuButton>
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
