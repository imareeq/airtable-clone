import { type PrismaClient } from "../../generated/prisma";

export const ViewService = {
  async create(db: PrismaClient, tableId: string, name: string) {
    return db.view.create({
      data: {
        name,
        tableId,
      },
    });
  },

  async update(db: PrismaClient, viewId: string, data: { 
    name?: string; 
    filterConfig?: any; 
    sortConfig?: any; 
    hiddenColumns?: any;
    searchQuery?: string | null;
  }) {
    return db.view.update({
      where: { id: viewId },
      data: {
        name: data.name,
        filterConfig: data.filterConfig,
        sortConfig: data.sortConfig,
        hiddenColumns: data.hiddenColumns,
        searchQuery: data.searchQuery,
      },
    });
  },

  async delete(db: PrismaClient, viewId: string) {
    return db.view.delete({
      where: { id: viewId },
    });
  },
};
