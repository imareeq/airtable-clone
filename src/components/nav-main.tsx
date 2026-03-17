"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "~/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "~/components/ui/sidebar";
import { CaretRightIcon } from "@phosphor-icons/react";
import { cn } from "~/lib/utils";
import { Separator } from "./ui/separator";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon: React.ReactNode;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
      icon?: React.ReactNode;
    }[];
  }[];
}) {
  const { state } = useSidebar();

  return (
    <SidebarGroup>
      <SidebarMenu className={cn("pt-2", state === "expanded" && "pl-2")}>
        {items.map((item) => (
          <Collapsible key={item.title} asChild defaultOpen={item.isActive}>
            <SidebarMenuItem className="pb-1.5">
              <SidebarMenuButton
                asChild
                tooltip={item.title}
                className="h-10 text-[15px] group-data-[collapsible=icon]:pl-1.5! [&_svg]:size-5"
              >
                <a href={item.url} className="flex w-full flex-row items-start">
                  {item.icon}
                  <span className="font-medium">{item.title}</span>
                </a>
              </SidebarMenuButton>
              {item.items?.length ? (
                <>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuAction className="top-2! w-6 cursor-pointer rounded-sm data-[state=open]:rotate-90 [&_svg]:size-3!">
                      <CaretRightIcon />
                      <span className="sr-only">Toggle</span>
                    </SidebarMenuAction>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items?.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <div className="flex flex-row items-center gap-2.5 pl-1.5 text-muted-foreground">
                            {subItem.icon && subItem.icon}
                            <span className="text-muted-foreground text-[11px] leading-snug whitespace-normal">
                              {subItem.title}
                            </span>
                          </div>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </>
              ) : null}
            </SidebarMenuItem>
          </Collapsible>
        ))}
        {state === "collapsed" && <Separator />}
      </SidebarMenu>
    </SidebarGroup>
  );
}
