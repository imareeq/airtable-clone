import { CaretDownIcon, StarIcon } from "@phosphor-icons/react";
import BaseActionsDropdown from "./base-actions-dropdown";
import RenameBaseForm from "./rename-base-form";
import { Button } from "./ui/button";
import type { Base } from "generated/prisma";
import BaseHeaderDropdownAccordion from "./base-header-popover-accordion";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import AirtableIcon from "./airtable-icon";
import { cn } from "~/lib/utils";
import { getBaseColorClass } from "~/lib/color-utils";

export default function BaseHeaderDropdown({ base }: { base: Base }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className="hover:bg-background text-lg font-semibold"
        >
          <div
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-lg",
              getBaseColorClass(base.color),
            )}
          >
            <AirtableIcon variant="white" className="size-6" />
          </div>
          {base.name} <CaretDownIcon />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        className="w-100 gap-3 p-4 shadow-lg"
        align="start"
        sideOffset={17.5}
      >
        <div className="flex w-full flex-row items-center justify-between">
          <RenameBaseForm
            baseId={base?.id}
            baseName={base?.name}
            className="bg-popover focus:bg-muted border-0 text-xl"
          />
          <div className="flex flex-row items-center">
            <Button variant="ghost">
              <StarIcon />
            </Button>
            <BaseActionsDropdown
              variant="ghost"
              baseId={base.id}
              items={["duplicate", "slack-notifications"]}
              showDeleteSeparator={false}
              onDeleteRedirect="/"
            />
          </div>
        </div>

        <div>
          <BaseHeaderDropdownAccordion
            baseId={base.id}
            baseColor={base.color}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
