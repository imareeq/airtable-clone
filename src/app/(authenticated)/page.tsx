"use client";

import { DashboardSidebar } from "~/components/dashboard-sidebar";
import BaseList from "~/components/base-list";
import DashboardQuickActions from "~/components/dashboard-quick-actions";
import { DashboardHeader } from "~/components/dashboard-header";
import { SidebarInset, SidebarProvider } from "~/components/ui/sidebar";

export default function Page() {
  return (
    <div className="[--header-height:calc(--spacing(14))]">
      <SidebarProvider className="flex flex-col">
        <DashboardHeader />
        <div className="flex flex-1">
          <DashboardSidebar collapsible="icon" />
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
