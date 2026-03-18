"use client";

import {
  CaretDownIcon,
  ClipboardTextIcon,
  FlowArrowIcon,
  ShapesIcon,
} from "@phosphor-icons/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Item } from "./ui/item";

const tableNavTools = [
  {
    icon: <ShapesIcon />,
    title: "Extensions",
    description: "Extend the functionality of your base",
  },
  {
    icon: <ClipboardTextIcon />,
    title: "Record templates",
    description: "Create records from a template",
  },
  {
    icon: <FlowArrowIcon />,
    title: "Date dependencies",
    description: "Confugre date shifting between dependent records",
  },
];

export default function TableNavToolsDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="z-100 flex cursor-pointer flex-row items-center gap-1 pr-1 text-xs">
        <p>Tools</p> <CaretDownIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-84.25 space-y-2.5 p-3">
        {tableNavTools.map((tool) => (
          <DropdownMenuItem
            key={tool.title}
            className="flex w-full flex-row p-2"
          >
            <Item
              variant="muted"
              className="bg-muted-foreground/10 flex h-8 w-8 items-center justify-center [&_svg]:size-4"
            >
              {tool.icon}
            </Item>
            <div className="flex flex-col">
              <p className="text-[13px]">{tool.title}</p>
              <p className="text-muted-foreground text-[11px]">
                {tool.description}
              </p>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
