import { faker } from "@faker-js/faker";
import { nanoid } from "nanoid";
import { ColumnType } from "generated/prisma";

export const DEFAULT_COLUMNS = [
  { name: "Name", type: ColumnType.TEXT },
  { name: "Notes", type: ColumnType.TEXT },
  { name: "Assignee", type: ColumnType.TEXT },
  { name: "Status", type: ColumnType.TEXT },
];

export function generateFakeValue(
  columnName: string,
  type: ColumnType,
): string | number {
  if (type === ColumnType.NUMBER)
    return faker.number.int({ min: 1, max: 1000 });
  switch (columnName) {
    case "Name":
      return faker.person.fullName();
    case "Assignee":
      return faker.person.firstName();
    case "Status":
      return faker.helpers.arrayElement([
        "Todo",
        "In progress",
        "Done",
        "Blocked",
      ]);
    case "Notes":
      return faker.lorem.sentence();
    default:
      return faker.lorem.word();
  }
}

export function generateFakeRows(
  columns: { id: string; name: string; type: ColumnType }[],
  count: number,
  startIndex = 0,
) {
  return Array.from({ length: count }, (_, i) => ({
    id: nanoid(17),
    orderIndex: startIndex + i,
    values: columns.map((col) => generateFakeValue(col.name, col.type)),
  }));
}
