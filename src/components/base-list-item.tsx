import { useState } from "react";
import { StarIcon, DotsThreeIcon } from "@phosphor-icons/react";
import { Button } from "./ui/button";
import { cn } from "~/lib/utils";
import BaseActionsDropdown from "./base-actions-dropdown";

interface BaseListItemProps {
  name: string;
  lastUpdated: Date;
  workspaceName: string;
  className?: string;
}

export default function BaseListItem({
  name,
  lastUpdated,
  workspaceName,
  className,
}: BaseListItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const initials = name.slice(0, 2).trim() || "Un";

  const getRelativeTimeString = (date: Date): string => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    if (diffInSeconds < 60) return "just now";
    const diffInHours = Math.floor(diffInSeconds / 3600);
    if (diffInHours < 24) return "today";
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return "last week";
    return "last month";
  };

  return (
    <div
      className={cn(
        "group hover:bg-muted-foreground/10 grid cursor-pointer grid-cols-[1.5fr_1fr_1fr] items-center rounded-md px-4 py-1.5 transition-colors",
        isOpen && "bg-gray-100",
        className,
      )}
    >
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-[#1d70e6] text-[10px] font-bold text-white uppercase">
          {initials}
        </div>

        <div className="flex items-center gap-2 overflow-hidden">
          <span className="truncate text-sm font-medium">{name}</span>
          <span
            className={cn(
              "text-muted-foreground hidden shrink-0 items-center text-xs whitespace-nowrap",
              isOpen ? "flex" : "group-hover:flex",
            )}
          >
            Open data
          </span>
        </div>
      </div>

      <div className="relative flex min-w-0 items-center -left-20">
        <div
          className={cn(
            "absolute left-0 flex items-center gap-0 transition-opacity",
            isOpen ? "opacity-100" : "opacity-0 group-hover:opacity-100",
          )}
        >
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground h-8 w-8"
          >
            <StarIcon size={18} />
          </Button>
          <BaseActionsDropdown
            onOpenChange={setIsOpen}
            baseId="123"
            variant="ghost"
            className=""
          />
        </div>

        <span className="text-muted-foreground truncate pl-20 text-xs">
          Opened {getRelativeTimeString(lastUpdated)}
        </span>
      </div>

      <div className="text-muted-foreground truncate text-xs">
        {workspaceName}
      </div>
    </div>
  );
}
