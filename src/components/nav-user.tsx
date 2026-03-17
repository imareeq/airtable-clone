"use client";

import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "~/components/ui/sidebar";
import { authClient } from "~/server/better-auth/client";
import { useRouter } from "next/navigation";
import { Separator } from "./ui/separator";
import {
  BellIcon,
  CaretRightIcon,
  EnvelopeSimpleIcon,
  LinkIcon,
  PaletteIcon,
  SignOutIcon,
  StarIcon,
  TranslateIcon,
  TrashIcon,
  UserIcon,
  UsersIcon,
  WrenchIcon,
} from "@phosphor-icons/react";
import type { ReactNode } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

export type MenuItem = {
  title: string;
  icon: ReactNode;
  secondary?: ReactNode;
};

const menuItems: MenuItem[] = [
  {
    title: "Account",
    icon: <UserIcon className="size-4" />,
  },
  {
    title: "Manage groups",
    icon: <UsersIcon className="size-4" />,
    secondary: <Badge className="bg-[#c4ecff] text-[#0f68a2]">Business</Badge>,
  },
  {
    title: "Notification preferences",
    icon: <BellIcon className="size-4" />,
    secondary: <CaretRightIcon />,
  },
  {
    title: "Language preferences",
    icon: <TranslateIcon className="size-4" />,
    secondary: <CaretRightIcon />,
  },
  {
    title: "Appearance",
    icon: <PaletteIcon className="size-4" />,
    secondary: <CaretRightIcon />,
  },
  {
    title: "Contact sales",
    icon: <EnvelopeSimpleIcon className="size-4" />,
  },
  {
    title: "Upgrade",
    icon: <StarIcon className="size-4" />,
  },
  {
    title: "Tell a friend",
    icon: <EnvelopeSimpleIcon className="size-4" />,
  },
  {
    title: "Integrations",
    icon: <LinkIcon className="size-4" />,
  },
  {
    title: "Builder hub",
    icon: <WrenchIcon className="size-4" />,
  },
  {
    title: "Trash",
    icon: <TrashIcon className="size-4" />,
  },
  {
    title: "Sign out",
    icon: <SignOutIcon className="size-4" />,
  },
];

export function NavUser() {
  const { isMobile } = useSidebar();
  const { data: session } = authClient.useSession();
  const router = useRouter();

  if (!session) {
    return null;
  }

  const { user } = session;

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
        },
      },
    });
  };

  return (
    <SidebarMenu className="w-auto pr-2">
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="flex items-center justify-center w-fit rounded-full">
            <button className="hover:bg-background! cursor-pointer rounded-full">
              <Avatar className="h-6.5 w-6.5 rounded-full hover:shadow">
                <AvatarImage src={user.image ?? ""} alt={user.name} />
                <AvatarFallback className="rounded-full text-xs">
                  {user.name[0]}
                </AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="text-muted-foregroun/75 mr-1 w-74 p-3"
            side="bottom"
            align="end"
          >
            <DropdownMenuGroup>
              <DropdownMenuLabel className="pb-1 font-semibold">
                {user.name}
              </DropdownMenuLabel>
              <DropdownMenuLabel className="text-muted-foreground pt-0 font-normal">
                {user.email}
              </DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {menuItems.slice(0, 5).map((item) => (
                <DropdownMenuItem
                  key={item.title}
                  className="flex items-center justify-between p-2"
                >
                  <div className="flex items-center gap-2">
                    {item.icon}
                    <span>{item.title}</span>
                  </div>
                  {item.secondary && <span>{item.secondary}</span>}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {menuItems.slice(5, 8).map((item) => (
                <DropdownMenuItem
                  key={item.title}
                  className="flex items-center justify-between p-2"
                >
                  <div className="flex items-center gap-2">
                    {item.icon}
                    <span>{item.title}</span>
                  </div>
                  {item.secondary && <span>{item.secondary}</span>}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {menuItems.slice(8, 10).map((item) => (
                <DropdownMenuItem
                  key={item.title}
                  className="flex items-center justify-between p-2"
                >
                  <div className="flex items-center gap-2">
                    {item.icon}
                    <span>{item.title}</span>
                  </div>
                  {item.secondary && <span>{item.secondary}</span>}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {menuItems.slice(10).map((item) => (
                <DropdownMenuItem
                  key={item.title}
                  className="flex items-center justify-between p-2"
                  onClick={item.title === "Sign out" ? handleLogout : undefined}
                >
                  <div className="flex items-center gap-2">
                    {item.icon}
                    <span>{item.title}</span>
                  </div>
                  {item.secondary && <span>{item.secondary}</span>}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
