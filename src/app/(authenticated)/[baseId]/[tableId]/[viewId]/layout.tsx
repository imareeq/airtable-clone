import type { ReactNode } from "react";
import TableNav from "~/components/table-nav";
import { SidebarInset, SidebarProvider } from "~/components/ui/sidebar";
import ViewHeader from "~/components/view-header";

export default async function ViewLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ baseId: string; tableId: string; viewId: string }>;
}) {
  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <SidebarProvider className="flex flex-col overflow-hidden">
        <TableNav />
        <ViewHeader />
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar here */}
          <SidebarInset className="overflow-auto">{children}</SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}
