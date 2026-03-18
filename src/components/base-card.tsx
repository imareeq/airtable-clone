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
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { cn } from "~/lib/utils";
import { useState } from "react";
import BaseActionsDropdown from "./base-actions-dropdown";
import Link from "next/link";

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
      <Link
        href={`/${id}/tableId`}
        className="absolute inset-0 z-0"
        aria-label={`Open base ${name}`}
      />
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

          <BaseActionsDropdown baseId={id} onOpenChange={setIsOpen} />
        </div>

        <div
          className="bg-primary flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-2xl font-medium text-white"
          aria-hidden="true"
        >
          {initials}
        </div>

        <div className="flex flex-col overflow-hidden">
          <h3 className="truncate text-xs leading-tight font-semibold text-[#1F2937]">
            {name}
          </h3>

          <div className="mt-1 flex items-center gap-1.5 text-xs">
            <span className="text-muted-foreground group-hover:hidden">
              Opened {getRelativeTimeString(lastUpdated)}
            </span>

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
