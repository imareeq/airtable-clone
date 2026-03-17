"use client";

import { AppSidebar } from "~/components/app-sidebar";
import BaseList from "~/components/base-list";
import DashboardQuickActions from "~/components/dashboard-quick-actions";
import { SiteHeader } from "~/components/site-header";
import { SidebarInset, SidebarProvider } from "~/components/ui/sidebar";

export default function Page() {
  return (
    <div className="[--header-height:calc(--spacing(14))]">
      <SidebarProvider className="flex flex-col">
        <SiteHeader />
        <div className="flex flex-1">
          <AppSidebar collapsible="icon" />
          <SidebarInset className="bg-muted flex h-auto w-full flex-col gap-5 px-12 py-8">
            <h1 className="text-[28px] font-bold">Home</h1>
            <DashboardQuickActions />
            <BaseList />
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}
