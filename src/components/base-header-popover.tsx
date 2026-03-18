import { CaretDownIcon, StarIcon } from "@phosphor-icons/react";
import BaseActionsDropdown from "./base-actions-dropdown";
import RenameBaseForm from "./rename-base-form";
import { Button } from "./ui/button";
import type { Base } from "generated/prisma";
import BaseHeaderDropdownAccordion from "./base-header-popover-accordion";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Separator } from "./ui/separator";

export default function BaseHeaderDropdown({ base }: { base: Base }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost">
          {base.name} <CaretDownIcon />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-100 p-4">
        <div className="flex w-full flex-row items-center justify-between">
          <RenameBaseForm baseId={base?.id} baseName={base?.name} />
          <div className="flex flex-row items-center">
            <Button variant="ghost">
              <StarIcon />
            </Button>
            <BaseActionsDropdown
              baseId={base.id}
              items={["duplicate", "slack-notifications"]}
              showDeleteSeparator={false}
              onDeleteRedirect="/"
            />
          </div>
        </div>

        <Separator />

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
