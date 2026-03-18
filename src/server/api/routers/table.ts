import { z } from "zod";
import { createTRPCRouter, baseProcedure, tableProcedure } from "~/server/api/trpc";
import { TableService } from "~/services/table-service";

export const TableRouter = createTRPCRouter({
  getByBaseId: baseProcedure
    .input(z.object({ baseId: z.string() }))
    .query(async ({ ctx, input }) => {
      return TableService.getByBaseId(ctx.db, input.baseId);
    }),

  create: baseProcedure
    .input(z.object({ baseId: z.string(), name: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return TableService.create(ctx.db, input.baseId, input.name);
    }),

  update: tableProcedure
    .input(z.object({ tableId: z.string(), name: z.string().optional() }))
    .mutation(async ({ ctx, input }) => {
      return TableService.update(ctx.db, input.tableId, input.name);
    }),

  delete: tableProcedure.mutation(async ({ ctx, input }) => {
    return TableService.delete(ctx.db, input.tableId);
  }),
});
