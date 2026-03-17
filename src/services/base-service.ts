import { type PrismaClient } from "../../generated/prisma";

export const BaseService = {
  async getAll(db: PrismaClient, userId: string) {
    return db.base.findMany({
      where: { ownerId: userId },
      select: {
        id: true,
        name: true,
        updatedAt: true,
      },
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
        color: data.color ?? "#0ea5e9",
        ownerId: userId,
      },
    });
  },

  async update(
    db: PrismaClient,
    baseId: string,
    data: { name?: string; color?: string },
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
