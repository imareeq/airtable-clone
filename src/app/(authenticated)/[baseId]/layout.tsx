import type { Metadata } from "next";
import type { ReactNode } from "react";
import AppHeader from "~/components/app-header";
import { AppSidebar } from "~/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "~/components/ui/sidebar";
import { api } from "~/trpc/server";

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

  return (
    <div className="min-h-screen">
      <div className="[--header-height:calc(--spacing(14))]">
        <SidebarProvider open={false}>
          <AppSidebar collapsible="icon" />
          <SidebarInset className="bg-muted flex h-auto w-full flex-col">
            <AppHeader baseId={baseId} />
            {children}
          </SidebarInset>
        </SidebarProvider>
      </div>
    </div>
  );
}
