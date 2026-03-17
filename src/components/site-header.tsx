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
import { ListIcon, SidebarIcon } from "@phosphor-icons/react";
import AirtableLogo from "./airtable-logo";

export function SiteHeader() {
  const { toggleSidebar } = useSidebar();

  return (
    <header className="bg-background sticky top-0 z-50 flex w-full items-center border-b">
      <div className="flex h-(--header-height) w-full items-center gap-3.5 px-1.5">
        <Button
          className="h-8 w-8 opacity-50 hover:opacity-100 hover:bg-background"
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
        >
          <ListIcon className="size-5 text-foreground" />
        </Button>

        <AirtableLogo />

        <SearchForm className="w-full sm:ml-auto sm:w-auto" />
      </div>
    </header>
  );
}
