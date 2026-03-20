import type { DBClient } from "~/server/lib/db";
import { ColumnType, type PrismaClient } from "../../generated/prisma";

export const ColumnService = {
  async create(
    db: DBClient,
    tableId: string,
    data: { name: string; type?: ColumnType },
  ) {
    return db.column.create({
      data: {
        name: data.name,
        type: data.type,
        tableId,
      },
    });
  },

  async createMany(
    db: DBClient,
    tableId: string,
    columns: { name: string; type: ColumnType }[],
  ) {
    return db.column.createManyAndReturn({
      data: columns.map((col, i) => ({
        tableId,
        name: col.name,
        type: col.type,
        orderIndex: i,
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
    return db.column.delete({
      where: { id: columnId },
    });
  },
};
