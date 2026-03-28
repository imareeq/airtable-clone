import type { ReactNode } from "react";
import { SidebarInset, SidebarProvider } from "~/components/ui/sidebar";
import ViewHeader from "~/components/view-header";
import { ViewSidebar } from "~/components/view-sidebar";
import { SortFilterStateProvider } from "~/contexts/sort-filter-state-context";
import { TableSearchProvider } from "~/contexts/table-search-context";
import { api, HydrateClient } from "~/trpc/server";

export default async function ViewLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ baseId: string; tableId: string; viewId: string }>;
}) {
  const { viewId } = await params;
  void api.view.getById.prefetch({ viewId });

  return (
    <HydrateClient>
      <SidebarProvider className="relative flex h-full min-h-0 w-full flex-col overflow-hidden">
        <TableSearchProvider>
          <SortFilterStateProvider>
            <ViewHeader />
            <div className="relative flex flex-1 overflow-hidden">
              <ViewSidebar
                disableHoverExpand
                className="absolute inset-y-0 h-full"
                collapsible="offcanvas"
              />
              <SidebarInset className="h-full w-full overflow-hidden">
                {children}
              </SidebarInset>
            </div>
          </SortFilterStateProvider>
        </TableSearchProvider>
      </SidebarProvider>
    </HydrateClient>
  );
}
