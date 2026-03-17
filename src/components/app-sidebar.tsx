"use client";

import * as React from "react";

import { NavMain } from "~/components/nav-main";
import { NavUser } from "~/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
} from "~/components/ui/sidebar";
import {
  HouseIcon,
  StarIcon,
  ShareIcon,
  UsersThreeIcon,
} from "@phosphor-icons/react";

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
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      className="top-(--header-height) h-[calc(100svh-var(--header-height))]!"
      {...props}
    >
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
