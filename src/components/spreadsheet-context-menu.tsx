import type { ReactNode } from "react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  ContextMenuSeparator,
} from "./ui/context-menu";
import {
  SparkleIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  CopyIcon,
  DiamondsFourIcon,
  ArrowsOutIcon,
  ChatCircleIcon,
  LinkIcon,
  EnvelopeIcon,
  TrashIcon,
  PaintBucketIcon,
  ArrowsOutSimpleIcon,
  ChatIcon,
  EnvelopeSimpleIcon,
} from "@phosphor-icons/react";
import { cn } from "~/lib/utils";
import OmniIcon from "./omni-icon";

type MenuItem =
  | {
      label: string;
      icon: ReactNode;
      onClick?: () => void;
      destructive?: boolean;
      separator?: never;
    }
  | { separator: true };

export default function SpreadsheetContextMenu({
  children,
  onDeleteRow,
}: {
  children: ReactNode;
  onDeleteRow: () => void;
}) {
  const menuItems: MenuItem[] = [
    { label: "Ask Omni", icon: <OmniIcon className="size-4 grayscale-100" /> },
    { separator: true },
    { label: "Insert record above", icon: <ArrowUpIcon className="size-4" /> },
    {
      label: "Insert record below",
      icon: <ArrowDownIcon className="size-4" />,
    },
    { separator: true },
    { label: "Duplicate record", icon: <CopyIcon className="size-4" /> },
    { label: "Apply template", icon: <PaintBucketIcon className="size-4" /> },
    {
      label: "Expand record",
      icon: <ArrowsOutSimpleIcon className="size-4" />,
    },
    { separator: true },
    { label: "Add comment", icon: <ChatIcon className="size-4" /> },
    { label: "Copy cell URL", icon: <LinkIcon className="size-4" /> },
    { label: "Send record", icon: <EnvelopeSimpleIcon className="size-4" /> },
    { separator: true },
    {
      label: "Delete record",
      icon: <TrashIcon className="text-foreground size-4" />,
      destructive: true,
      onClick: onDeleteRow,
    },
  ];

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
      <ContextMenuContent className="w-60 p-3 shadow-lg">
        {menuItems.map((item, index) => {
          if ("separator" in item) {
            return <ContextMenuSeparator key={index} />;
          }

          return (
            <ContextMenuItem
              key={item.label}
              onClick={item.onClick}
              className={cn(
                "hover:bg-background! flex cursor-pointer items-center gap-2 p-2 text-[13px] font-thin text-black/85 hover:text-black/85!",
                item.destructive && "text-destructive focus:text-destructive",
              )}
            >
              {item.icon}
              {item.label}
            </ContextMenuItem>
          );
        })}
      </ContextMenuContent>
    </ContextMenu>
  );
}
