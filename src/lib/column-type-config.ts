import { z } from "zod";
import { ColumnType } from "generated/prisma";

export type FilterOperator = {
  value: string;
  label: string;
  requiresValue: boolean;
};

export type ColumnTypeConfig = {
  label: string;
  sortAsc: string;
  sortDesc: string;
  validate: (value: string) => string | null;
  format: (value: string) => string | number;
  filterOperators: FilterOperator[];
};

export const columnTypeConfig = {
  [ColumnType.TEXT]: {
    label: "Text",
    sortAsc: "Sort A → Z",
    sortDesc: "Sort Z → A",
    validate: (_value: string) => null,
    format: (value: string) => value,
    filterOperators: [
      { value: "contains", label: "contains", requiresValue: true },
      { value: "not_contains", label: "does not contain", requiresValue: true },
      { value: "is_equal_to", label: "is equal to", requiresValue: true },
      { value: "is_empty", label: "is empty", requiresValue: false },
      { value: "is_not_empty", label: "is not empty", requiresValue: false },
    ],
  },
  [ColumnType.NUMBER]: {
    label: "Number",
    sortAsc: "Sort 1 → 9",
    sortDesc: "Sort 9 → 1",
    validate: (value: string) => {
      if (value === "") return null;
      const parsed = z.coerce.number().safeParse(value);
      return parsed.success ? null : "please enter a number";
    },
    format: (value: string) => {
      const num = Number(value);
      return isNaN(num)
        ? value
        : num.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          });
    },
    filterOperators: [
      { value: "greater_than", label: ">", requiresValue: true },
      { value: "less_than", label: "<", requiresValue: true },
    ],
  },
} satisfies Record<ColumnType, ColumnTypeConfig>;
