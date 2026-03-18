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
  baseColor: string;
}) {
  return (
    <Accordion type="multiple">
      <AccordionItem value="appearance-picker">
        <AccordionTrigger>Appearance</AccordionTrigger>
        <AccordionContent>
          <AppearancePicker baseId={baseId} selectedColor={baseColor} />
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="base-guide">
        <AccordionTrigger>Base guide</AccordionTrigger>
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
