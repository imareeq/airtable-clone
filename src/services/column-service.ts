import type { DBClient } from "~/server/lib/db";
import { ColumnType, type PrismaClient } from "../../generated/prisma";

export const ColumnService = {
  async create(
    db: DBClient,
    tableId: string,
    data: { name: string; type?: ColumnType },
  ) {
    const existingCount = await db.column.count({ where: { tableId } });

    const column = await db.column.create({
      data: {
        name: data.name,
        type: data.type ?? ColumnType.TEXT,
        tableId,
        orderIndex: existingCount,
      },
    });

    await db.$executeRawUnsafe(
      `ALTER TABLE "spreadsheet_${tableId}" ADD COLUMN "${column.id}" TEXT`,
    );

    return column;
  },

  async createMany(
    db: DBClient,
    tableId: string,
    columns: { name: string; type: ColumnType }[],
  ) {
    const existingCount = await db.column.count({ where: { tableId } });

    return db.column.createManyAndReturn({
      data: columns.map((col, i) => ({
        tableId,
        name: col.name,
        type: col.type,
        orderIndex: existingCount + i,
      })),
    });
  },

  async update(
    db: DBClient,
    columnId: string,
    data: { name?: string; type?: ColumnType },
  ) {
    return db.column.update({
      where: { id: columnId },
      data: {
        name: data.name,
        type: data.type,
      },
    });
  },

  async delete(db: DBClient, columnId: string) {
    const column = await db.column.delete({
      where: { id: columnId },
    });

    await db.$executeRawUnsafe(
      `ALTER TABLE "spreadsheet_${column.tableId}" DROP COLUMN "${columnId}"`,
    );

    return column;
  },
};
