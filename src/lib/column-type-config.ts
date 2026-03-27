import { z } from "zod";
import { ColumnType } from "generated/prisma";

export type ColumnTypeConfig = {
  label: string;
  sortAsc: string;
  sortDesc: string;
  validate: (value: string) => string | null;
  format: (value: string) => string | number;
};

export const columnTypeConfig = {
  [ColumnType.TEXT]: {
    label: "Text",
    sortAsc: "Sort A → Z",
    sortDesc: "Sort Z → A",
    validate: (_value: string) => null,
    format: (value: string) => value,
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
  },
} satisfies Record<ColumnType, ColumnTypeConfig>;
