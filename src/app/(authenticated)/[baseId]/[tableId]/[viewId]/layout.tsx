import type { ReactNode } from "react";
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
    <div className="h-fit">
      <SidebarProvider className="flex flex-col">
        <ViewHeader />
        <div className="flex flex-1">
          {/* Sidebar here */}
          <SidebarInset>{children}</SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}
