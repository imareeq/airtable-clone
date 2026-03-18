"use client";

import { api } from "~/trpc/react";
import { useState } from "react";
import BaseHeaderDropdown from "./base-header-popover";
import AppHeaderNav from "./app-header-nav";
import { Button } from "./ui/button";
import {
  ClockCounterClockwiseIcon,
  LinkIcon,
  SidebarSimpleIcon,
  UsersIcon,
} from "@phosphor-icons/react";
import AirtablePlusFillIcon from "./airtable-plus-fill-icon";
import { useIsMobile } from "~/hooks/use-mobile";
import { cn } from "~/lib/utils";
import { getBaseColorClass } from "~/lib/color-utils";

export default function AppHeader({ baseId }: { baseId: string }) {
  const {
    data: base,
    isLoading,
    error,
  } = api.base.getById.useQuery({
    baseId: baseId,
  });

  const isMobile = useIsMobile();
  const [selectedColor, setSelectedColor] = useState("purple");

  if (isLoading) {
    return (
      <header className="bg-background sticky top-0 z-50 flex h-(--header-height) w-full border-b"></header>
    );
  }

  if (error) return <div className="text-destructive">{error.message}</div>;
  if (!base) return <div>404</div>;

  return (
    <header className="bg-background sticky top-0 z-50 flex w-full items-center border-b">
      <div className="flex h-(--header-height) w-full items-center justify-between gap-3.5 px-1.5">
        <div className="flex basis-1/3 flex-row items-center justify-start gap-3.5">
          <BaseHeaderDropdown base={base} />
        </div>

        <AppHeaderNav />

        <div className="flex basis-1/3 flex-row items-center justify-end gap-4">
          <Button
            variant="ghost"
            className="h-7 w-7 rounded-full"
            title="Base history"
          >
            <ClockCounterClockwiseIcon className="size-4" />
          </Button>

          <Button
            size="lg"
            className="bg-muted-foreground/10 text-foreground hover:bg-muted-foreground/10 rounded-full text-xs leading-none"
          >
            <AirtablePlusFillIcon className="size-4" />
            Upgrade
          </Button>

          <div className="flex flex-row gap-1.5">
            <Button
              size="lg"
              variant="outline"
              className="rounded-xl leading-none"
            >
              <SidebarSimpleIcon />
              {!isMobile && "Launch"}
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="rounded-xl leading-none"
              title="Copy link"
            >
              <LinkIcon />
            </Button>

            <Button
              size="lg"
              className={cn("rounded-xl leading-none", getBaseColorClass(base.color))}
            >
              {isMobile ? <UsersIcon /> : "Share"}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
