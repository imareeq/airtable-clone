import type { ReactNode } from "react";
import { SidebarInset, SidebarProvider } from "~/components/ui/sidebar";
import ViewHeader from "~/components/view-header";
import { ViewProvider } from "~/contexts/view-context";
import { api } from "~/trpc/server";

export default async function ViewLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ baseId: string; tableId: string; viewId: string }>;
}) {
  const { viewId } = await params;
  const view = await api.view.getById({ viewId });

  return (
    <ViewProvider view={view}>
      <div className="flex flex-1 flex-col overflow-hidden">
        <SidebarProvider className="flex flex-col overflow-hidden">
          <ViewHeader />
          <div className="flex flex-1 overflow-hidden">
            {/* Sidebar here */}
            <SidebarInset className="overflow-auto">{children}</SidebarInset>
          </div>
        </SidebarProvider>
      </div>
    </ViewProvider>
  );
}
