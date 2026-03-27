import { ColumnType } from "generated/prisma";

export function isValidNumberInput(value: string): boolean {
  if (value === "" || value === "-" || value === "." || value === "-.")
    return true;
  return !isNaN(Number(value));
}