"use client";

import { Label } from "~/components/ui/label";
import { SidebarInput } from "~/components/ui/sidebar";
import { MagnifyingGlassIcon } from "@phosphor-icons/react";

export function SearchForm({ ...props }: React.ComponentProps<"form">) {
  return (
    <form {...props}>
      <div className="relative">
        <Label htmlFor="search" className="sr-only">
          Search
        </Label>
        <SidebarInput
          id="search"
          placeholder="Search..."
          className="bg-background h-8 rounded-full pl-10"
        />
        <MagnifyingGlassIcon className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 opacity-75 select-none" />
        <p className="text-muted-foreground pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-xs select-none">
          ctrl K
        </p>
      </div>
    </form>
  );
}
