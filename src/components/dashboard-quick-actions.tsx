import { Card, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { GridFourIcon, ArrowUpIcon, TableIcon } from "@phosphor-icons/react";
import OmniIcon from "./omni-icon";

const options = [
  {
    icon: <OmniIcon className="self-center" />,
    title: "Start with Omni",
    description: "Use AI to build a custom app tailored to your workflow",
  },
  {
    icon: <GridFourIcon className="text-[#63498d]" />,
    title: "Start with templates",
    description: "Select a template to get started and customize as you go.",
  },
  {
    icon: <ArrowUpIcon className="text-[#0d7f78]" />,
    title: "Quickly upload",
    description: "Easily migrate your existing projects in just a few minutes.",
  },
  {
    icon: <TableIcon className="text-[#3b66a3]" />,
    title: "Build an app on your own",
    description: "Start with a blank app and build your ideal workflow.",
  },
];

export default function DashboardQuickActions() {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
      {options.map((option) => (
        <Card
          key={option.title}
          className="shrink-0 basis-62.5 cursor-pointer transition-shadow hover:shadow-md"
        >
          <CardHeader className="gap-2">
            <div className="flex items-center gap-2 [&_svg]:size-5">
              {option.icon}
              <CardTitle className="text-base font-semibold">
                {option.title}
              </CardTitle>
            </div>
            <CardDescription className="text-xs leading-snug">
              {option.description}
            </CardDescription>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}
