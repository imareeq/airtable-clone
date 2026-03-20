import type { DBClient } from "~/server/lib/db";
import { BaseColor } from "../../generated/prisma";
import { TableService } from "./table-service";

export const BaseService = {
  async getAll(db: DBClient, userId: string) {
    return db.base.findMany({
      where: { ownerId: userId },
      include: {
        tables: {
          orderBy: { orderIndex: "asc" },
          take: 1,
          include: {
            views: {
              orderBy: { createdAt: "asc" },
              take: 1,
            },
          },
        },
      },
      orderBy: { updatedAt: "desc" },
    });
  },

  async create(
    db: DBClient,
    userId: string,
    data: { name: string; color?: BaseColor },
  ) {
    const base = await db.base.create({
      data: {
        name: data.name,
        color: data.color ?? BaseColor.BLUE,
        ownerId: userId,
      },
    });

    await TableService.create(db, base.id, "Table 1");

    return base;
  },

  async update(
    db: DBClient,
    baseId: string,
    data: { name?: string; color?: BaseColor },
  ) {
    return db.base.update({
      where: { id: baseId },
      data: {
        name: data.name,
        color: data.color,
      },
    });
  },

  async delete(db: DBClient, baseId: string) {
    return db.base.delete({
      where: { id: baseId },
    });
  },
};
