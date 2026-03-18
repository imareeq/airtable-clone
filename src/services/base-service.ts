import { type PrismaClient } from "../../generated/prisma";

export const BaseService = {
  async getAll(db: PrismaClient, userId: string) {
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
    db: PrismaClient,
    userId: string,
    data: { name: string; color?: string },
  ) {
    return db.base.create({
      data: {
        name: data.name,
        color: data.color ?? "BLUE",
        ownerId: userId,
        tables: {
          create: {
            name: "Table 1",
            views: {
              create: {
                name: "Grid view",
              },
            },
          },
        },
      },
      include: {
        tables: {
          include: {
            views: true,
          },
        },
      },
    });
  },

  async update(
    db: PrismaClient,
    baseId: string,
    data: { name?: string; color?: any },
  ) {
    return db.base.update({
      where: { id: baseId },
      data: {
        name: data.name,
        color: data.color,
      },
    });
  },

  async delete(db: PrismaClient, baseId: string) {
    return db.base.delete({
      where: { id: baseId },
    });
  },
};
