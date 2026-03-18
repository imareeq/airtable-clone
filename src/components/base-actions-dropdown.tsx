"use client";

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
  SlackLogoIcon,
} from "@phosphor-icons/react";
import { Button } from "./ui/button";
import { cn } from "~/lib/utils";
import { api } from "~/trpc/react";
import { toast } from "sonner";
import type { Icon } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";

export type BaseActionItem =
  | "rename"
  | "duplicate"
  | "move"
  | "go-to-workspace"
  | "customize-appearance"
  | "slack-notifications";

interface ActionConfig {
  icon: Icon;
  label: string;
  onClick?: () => void;
}

const ACTION_CONFIG: Record<BaseActionItem, ActionConfig> = {
  rename: { icon: PencilSimpleIcon, label: "Rename" },
  duplicate: { icon: CopyIcon, label: "Duplicate" },
  move: { icon: ArrowRightIcon, label: "Move" },
  "go-to-workspace": { icon: UsersThreeIcon, label: "Go to workspace" },
  "customize-appearance": {
    icon: PaintBrushHouseholdIcon,
    label: "Customize appearance",
  },
  "slack-notifications": { icon: SlackLogoIcon, label: "Slack notifications" },
};

export interface BaseActionsDropdownProps {
  baseId: string;
  items?: BaseActionItem[];
  showDelete?: boolean;
  showDeleteSeparator?: boolean;
  onDeleteRedirect?: string;
  onOpenChange?: (open: boolean) => void;
  onAction?: (action: BaseActionItem) => void;
  variant?: "outline" | "ghost";
  className?: string;
}

const DEFAULT_ITEMS: BaseActionItem[] = [
  "rename",
  "duplicate",
  "move",
  "go-to-workspace",
  "customize-appearance",
];

export default function BaseActionsDropdown({
  baseId,
  items = DEFAULT_ITEMS,
  showDelete = true,
  showDeleteSeparator = true,
  onDeleteRedirect,
  onOpenChange,
  onAction,
  variant = "outline",
  className,
}: BaseActionsDropdownProps) {
  const utils = api.useUtils();
  const router = useRouter();

  const deleteBase = api.base.delete.useMutation({
    onSuccess: async () => {
      await utils.base.getAll.invalidate();
      onDeleteRedirect && router.push("/");
    },
    onError: (error) => toast.error(`Failed to delete base: ${error.message}`),
  });

  const handleDelete = () => deleteBase.mutate({ baseId });

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
        {items.map((action) => {
          const { icon: Icon, label } = ACTION_CONFIG[action];
          return (
            <DropdownMenuItem
              key={action}
              className="gap-2 p-2 text-xs"
              onClick={() => onAction?.(action)}
            >
              <Icon className="size-4" />
              {label}
            </DropdownMenuItem>
          );
        })}

        {showDelete && (
          <>
            {showDeleteSeparator && items.length > 0 && (
              <DropdownMenuSeparator className="my-3 px-2" />
            )}
            <DropdownMenuItem className="gap-2 text-xs" onClick={handleDelete}>
              <TrashIcon className="size-4" />
              Delete
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
