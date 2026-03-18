"use client";

import * as React from "react";

import { NavMain } from "~/components/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "~/components/ui/sidebar";
import {
  HouseIcon,
  StarIcon,
  ShareIcon,
  UsersThreeIcon,
  BookOpenIcon,
  ShoppingBagOpenIcon,
  UploadSimpleIcon,
  PlusIcon,
} from "@phosphor-icons/react";
import { Separator } from "./ui/separator";
import { Item } from "./ui/item";
import CreateBaseButton from "./create-base-button";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Home",
      url: "#",
      icon: <HouseIcon />,
      isActive: true,
    },
    {
      title: "Starred",
      url: "#",
      icon: <StarIcon />,
      items: [
        {
          title:
            "Your starred bases, interfaces, and workspaces will appear here",
          url: "#",
          icon: (
            <Item
              variant="outline"
              className="flex aspect-square w-7.5 shrink-0 items-center justify-center p-0 opacity-50"
            >
              <StarIcon className="size-4" />
            </Item>
          ),
        },
      ],
    },
    {
      title: "Shared",
      url: "#",
      icon: <ShareIcon />,
    },
    {
      title: "Workspaces",
      url: "#",
      icon: <UsersThreeIcon />,
      items: [
        {
          title: "My First Workspace",
          url: "#",
          icon: (
            <Item
              variant="muted"
              className="flex aspect-square w-7.5 shrink-0 items-center justify-center p-0"
            >
              <UsersThreeIcon className="size-4" />
            </Item>
          ),
        },
      ],
    },
  ],
  footer: [
    {
      title: "Templates and apps",
      url: "#",
      icon: <BookOpenIcon />,
    },
    {
      title: "Marketplace",
      url: "#",
      icon: <ShoppingBagOpenIcon />,
    },
    {
      title: "Import",
      url: "#",
      icon: <UploadSimpleIcon />,
    },
  ],
};

export function DashboardSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { state } = useSidebar();

  return (
    <Sidebar
      className="bg-background top-(--header-height) h-[calc(100svh-var(--header-height))]! pb-2"
      {...props}
    >
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>

      <SidebarFooter
        className={
          state === "collapsed"
            ? "text-muted-foreground flex flex-col items-center justify-center"
            : ""
        }
      >
        <Separator />
        <SidebarMenu>
          {data.footer.map((el) => (
            <SidebarMenuItem key={el.title}>
              <SidebarMenuButton>
                {el.icon}
                <span>{el.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
        <CreateBaseButton />
      </SidebarFooter>
    </Sidebar>
  );
}
