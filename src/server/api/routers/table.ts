import { TRPCError } from "@trpc/server";
import { z } from "zod";
import {
  createTRPCRouter,
  baseProcedure,
  tableProcedure,
} from "~/server/api/trpc";
import { TableService } from "~/services/table-service";

export const TableRouter = createTRPCRouter({
  getById: tableProcedure.query(async ({ ctx }) => {
    return ctx.table;
  }),

  getRows: tableProcedure.query(async ({ ctx }) => {
    return TableService.getRows(
      ctx.db,
      ctx.table.id,
      ctx.table.columns.map((col) => col.id),
    );
  }),

  create: baseProcedure
    .input(z.object({ baseId: z.string(), name: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.$transaction(async (tx) => {
        return await TableService.create(tx, input.baseId, input.name);
      });
    }),

  update: tableProcedure
    .input(z.object({ tableId: z.string(), name: z.string().optional() }))
    .mutation(async ({ ctx, input }) => {
      return TableService.update(ctx.db, input.tableId, input.name);
    }),

  delete: tableProcedure.mutation(async ({ ctx, input }) => {
    return ctx.db.$transaction(async (tx) => {
      const tableCount = await tx.table.count({
        where: { baseId: ctx.table.baseId },
      });

      if (tableCount <= 1) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Cannot delete the only table in a base",
        });
      }

      return await TableService.delete(tx, input.tableId);
    });
  }),
});
