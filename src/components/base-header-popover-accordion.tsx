import type { BaseColor } from "prisma/generated/schemas";
import AppearancePicker from "./appearance-picker";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

export default function BaseHeaderDropdownAccordion({
  baseId,
  baseColor,
}: {
  baseId: string;
  baseColor: BaseColor;
}) {
  return (
    <Accordion type="multiple" className="border-0 border-t px-0">
      <AccordionItem value="appearance-picker">
        <AccordionTrigger className="py-4 text-[17px] font-semibold">
          Appearance
        </AccordionTrigger>
        <AccordionContent>
          <AppearancePicker baseId={baseId} selectedColor={baseColor} />
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="base-guide">
        <AccordionTrigger className="py-4 text-[17px] font-semibold">
          Base guide
        </AccordionTrigger>
        <AccordionContent>
          <p>
            Teammates will see this when they first open the base - add a
            description, goals, links, things like that.
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
