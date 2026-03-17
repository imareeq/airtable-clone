import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  DotsThreeIcon,
  PencilSimpleIcon,
  CopyIcon,
  ArrowRightIcon,
  UsersThreeIcon,
  PaintBrushHouseholdIcon,
  TrashIcon,
} from "@phosphor-icons/react";
import { Button } from "./ui/button";
import { cn } from "~/lib/utils";

export interface BaseActionsDropdownProps {
  baseId: string;
  onOpenChange?: (open: boolean) => void;
  variant?: "outline" | "ghost";
  className?: string;
}

export default function BaseActionsDropdown({
  baseId,
  onOpenChange,
  variant = "outline",
  className,
}: BaseActionsDropdownProps) {
  return (
    <DropdownMenu onOpenChange={onOpenChange}>
      <DropdownMenuTrigger asChild>
        <Button
          variant={variant}
          size="icon"
          className={cn("h-8 w-8 rounded-lg", className)}
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
          <PaintBrushHouseholdIcon className="size-4" /> Customize appearance
        </DropdownMenuItem>
        <DropdownMenuSeparator className="my-3 px-2" />
        <DropdownMenuItem className="gap-2 text-xs">
          <TrashIcon className="size-4" /> Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
