import { type PrismaClient } from "../../generated/prisma";

export const TableService = {
  async getByBaseId(db: PrismaClient, baseId: string) {
    return db.table.findMany({
      where: { baseId },
      orderBy: { orderIndex: "asc" },
      include: {
        views: {
          orderBy: { createdAt: "asc" },
          take: 1,
        },
      },
    });
  },

  async create(db: PrismaClient, baseId: string, name: string) {
    return db.table.create({
      data: {
        name,
        baseId,
        views: {
          create: {
            name: "Grid view",
          },
        },
      },
      include: {
        views: true,
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
