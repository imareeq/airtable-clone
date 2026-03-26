import type { Metadata } from "next";
import type { ReactNode } from "react";
import AppHeader from "~/components/app-header";
import { AppSidebar } from "~/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "~/components/ui/sidebar";
import { api, HydrateClient } from "~/trpc/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ baseId: string }>;
}) {
  const { baseId } = await params;

  try {
    const base = await api.base.getById({ baseId });
    return {
      title: `${base?.name ?? "Untitled Base"} - Airtable`,
    };
  } catch (error) {
    return {
      title: "Base Not Found",
    };
  }
}

export default async function AppLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ baseId: string }>;
}) {
  const { baseId } = await params;
  void (await api.base.getById.prefetch({ baseId }));

  return (
    <HydrateClient>
      <div className="h-full overflow-hidden">
        <div className="h-full [--header-height:calc(--spacing(14))]">
          <SidebarProvider open={false} className="h-full min-h-0 w-full">
            <AppSidebar collapsible="icon" />
            <SidebarInset className="bg-muted flex h-full w-full flex-col overflow-hidden">
              <AppHeader />
              {children}
            </SidebarInset>
          </SidebarProvider>
        </div>
      </div>
    </HydrateClient>
  );
}
