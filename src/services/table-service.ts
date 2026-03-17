import { type PrismaClient } from "../../generated/prisma";

export const TableService = {
  async create(db: PrismaClient, baseId: string, name: string) {
    return db.table.create({
      data: {
        name,
        baseId,
      },
    });
  },

  async update(db: PrismaClient, tableId: string, name?: string) {
    return db.table.update({
      where: { id: tableId },
      data: {
        name,
      },
    });
  },

  async delete(db: PrismaClient, tableId: string) {
    return db.table.delete({
      where: { id: tableId },
    });
  },
};
