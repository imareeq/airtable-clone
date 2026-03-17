import {
  ArrowRightIcon,
  CopyIcon,
  DatabaseIcon,
  DotsThreeIcon,
  PaintBrushHouseholdIcon,
  PencilSimpleIcon,
  StarIcon,
  TrashIcon,
  UsersThreeIcon,
} from "@phosphor-icons/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { cn } from "~/lib/utils";
import { useState } from "react";

interface BaseCardProps {
  name: string;
  id: string;
  lastUpdated: Date;
  className?: string;
}

export default function BaseCard({
  name,
  id,
  lastUpdated,
  className,
}: BaseCardProps) {
  const initials = name.slice(0, 2).trim() || "Un";
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const getRelativeTimeString = (date: Date): string => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    if (diffInSeconds < 60) return "just now";
    const diffInHours = Math.floor(diffInSeconds / 3600);
    if (diffInHours < 24) return "today";
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return "last week";
    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths === 1) return "last month";
    if (diffInMonths > 1) return `${diffInMonths} months ago`;
    return `${diffInDays} days ago`;
  };

  return (
    <Card
      className={cn(
        "group relative w-full cursor-pointer transition-shadow hover:shadow-md",
        isOpen && "shadow-md",
        className,
      )}
    >
      <CardContent className="flex items-center gap-4">
        <div
          className={cn(
            "absolute top-3 right-3 z-10 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100",
            isOpen && "opacity-100",
          )}
        >
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-lg bg-white"
          >
            <StarIcon size={16} />
          </Button>

          <DropdownMenu onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-lg bg-white"
              >
                <DotsThreeIcon size={20} weight="bold" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-60 p-3">
              <DropdownMenuItem className="gap-2 p-2 text-xs">
                <PencilSimpleIcon className="size-4" /> Rename
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2 p-2 text-xs">
                <CopyIcon className="size-4" /> Duplicate
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2 p-2 text-xs">
                <ArrowRightIcon className="size-4" /> Move
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2 p-2 text-xs">
                <UsersThreeIcon className="size-4" /> Go to workspace
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2 p-2 text-xs">
                <PaintBrushHouseholdIcon className="size-4" /> Customize
                appearance
              </DropdownMenuItem>
              <DropdownMenuSeparator className="my-3 px-2" />
              <DropdownMenuItem className="gap-2 text-xs">
                <TrashIcon className="size-4" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Icon */}
        <div
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#1d70e6] text-2xl font-medium text-white"
          aria-hidden="true"
        >
          {initials}
        </div>

        {/* Text Area */}
        <div className="flex flex-col overflow-hidden">
          <h3 className="truncate text-xs leading-tight font-semibold text-[#1F2937]">
            {name}
          </h3>

          <div className="mt-1 flex items-center gap-1.5 text-xs">
            {/* Default View */}
            <span className="text-muted-foreground group-hover:hidden">
              Opened {getRelativeTimeString(lastUpdated)}
            </span>

            {/* Hover View */}
            <span className="hidden items-center gap-1.5 text-slate-500 group-hover:flex">
              <DatabaseIcon size={16} />
              Open data
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
