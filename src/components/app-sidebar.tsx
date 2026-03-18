"use client";

import { ArrowLeftIcon, BellIcon, QuestionIcon } from "@phosphor-icons/react";
import AirtableIcon from "./airtable-icon";
import {
  SidebarContent,
  Sidebar,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "./ui/sidebar";
import Link from "next/link";
import { Button } from "./ui/button";
import { NavUser } from "./nav-user";
import OmniIcon from "./omni-icon";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      disableHoverExpand
      className="bg-background h-full py-2"
      {...props}
    >
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="gap-2">
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                className="relative flex items-center justify-center"
              >
                <Link href={"/"} title="Back to home" className="rounded-full">
                  <AirtableIcon
                    variant="black"
                    className="size-6 transition-opacity duration-200 group-hover/menu-button:opacity-0"
                  />
                  <ArrowLeftIcon className="absolute size-4 opacity-0 transition-opacity duration-200 group-hover/menu-button:opacity-100" />
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton className="relative flex w-full items-center justify-center">
                <OmniIcon className="size-7 grayscale-100" />
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Button variant="ghost" title="Help">
                <QuestionIcon />
              </Button>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Button variant="ghost" title="Help">
                <BellIcon />
              </Button>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavUser />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
