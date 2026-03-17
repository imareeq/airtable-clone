import { type PrismaClient, type ColumnType } from "../../generated/prisma";

export const ColumnService = {
  async create(db: PrismaClient, tableId: string, data: { name: string; type?: ColumnType }) {
    return db.column.create({
      data: {
        name: data.name,
        type: data.type,
        tableId,
      },
    });
  },

  async update(db: PrismaClient, columnId: string, data: { name?: string; type?: ColumnType }) {
    return db.column.update({
      where: { id: columnId },
      data: {
        name: data.name,
        type: data.type,
      },
    });
  },

  async delete(db: PrismaClient, columnId: string) {
    return db.column.delete({
      where: { id: columnId },
    });
  },
};
