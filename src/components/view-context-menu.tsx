"use client";

import {
  StarIcon,
  PencilSimpleIcon,
  CopyIcon,
  TrashIcon,
} from "@phosphor-icons/react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "./ui/context-menu";
import { Badge } from "./ui/badge";

interface ViewContextMenuProps {
  children: React.ReactNode;
  onRename?: () => void;
  onDuplicate?: () => void;
  onDelete?: () => void;
  onFavorite?: () => void;
  isLastView: boolean;
}

export function ViewContextMenu({
  children,
  onRename,
  onDuplicate,
  onDelete,
  onFavorite,
  isLastView = false,
}: ViewContextMenuProps) {
  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
      <ContextMenuContent
        onCloseAutoFocus={(e) => e.preventDefault()}
        className="w-70 p-3"
      >
        <ContextMenuItem className="gap-2.5 text-[13px]" onClick={onFavorite}>
          <StarIcon className="size-4" />
          Add to &apos;My favorites&apos;
          <Badge
            variant="secondary"
            className="bg-primary/10 text-primary ml-auto rounded-full px-2 py-0.5 text-[11px] font-medium"
          >
            ✦ Team
          </Badge>
        </ContextMenuItem>
        <ContextMenuItem className="gap-2.5 p-2 text-[13px]" onClick={onRename}>
          <PencilSimpleIcon className="size-4" />
          Rename view
        </ContextMenuItem>
        <ContextMenuItem
          className="gap-2.5 p-2 text-[13px]"
          onClick={onDuplicate}
        >
          <CopyIcon className="size-4" />
          Duplicate view
        </ContextMenuItem>
        <ContextMenuItem
          className="text-destructive gap-2.5 p-2 text-[13px]"
          disabled={isLastView}
          onClick={onDelete}
        >
          <TrashIcon className="text-foreground size-4" />
          Delete view
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
