"use client";

import { SearchForm } from "~/components/search-form";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import { useSidebar } from "~/components/ui/sidebar";
import {
  BellIcon,
  ListIcon,
  QuestionIcon,
  SidebarIcon,
} from "@phosphor-icons/react";
import AirtableLogo from "./airtable-logo";
import { NavUser } from "./nav-user";

export function SiteHeader() {
  const { toggleSidebar } = useSidebar();

  return (
    <header className="bg-background sticky top-0 z-50 flex w-full items-center border-b">
      <div className="flex h-(--header-height) w-full items-center justify-between gap-3.5 px-1.5">
        <div className="flex basis-1/3 flex-row items-center justify-start gap-3.5">
          <Button
            className="hover:bg-background h-8 w-8 opacity-50 hover:opacity-100"
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
          >
            <ListIcon className="text-foreground size-5" />
          </Button>

          <AirtableLogo />
        </div>

        <SearchForm className="max-w-85 basis-1/3 self-center" />

        <div className="flex basis-1/3 flex-row items-center justify-end gap-5">
          <span className="flex flex-row items-center justify-center gap-1">
            <QuestionIcon />
            <p className="text-xs">Help</p>
          </span>
          <Button variant="outline" className="h-6.5 w-6.5 rounded-full">
            <BellIcon />
          </Button>
          <NavUser />
        </div>
      </div>
    </header>
  );
}
