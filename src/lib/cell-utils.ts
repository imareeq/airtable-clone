import { ColumnType } from "generated/prisma";

export function isValidNumberInput(value: string): boolean {
  if (value === "" || value === "-" || value === "." || value === "-.")
    return true;
  return !isNaN(Number(value));
}

export function validateValue(value: string, type: ColumnType): string | null {
  if (type === ColumnType.NUMBER) {
    if (!value || value.trim() === "") return null;
    if (value === "-" || value === "." || value === "-.") return null;
    if (isNaN(Number(value))) {
      return "please enter a number";
    }
  }
  return null;
}