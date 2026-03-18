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
      <DropdownMenuTrigger>
        Tools <CaretDownIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem></DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
