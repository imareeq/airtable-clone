import { z } from "zod";
import { createTRPCRouter, tableProcedure, columnProcedure } from "~/server/api/trpc";
import { ColumnService } from "~/services/column-service";
import { ColumnType } from "../../../../generated/prisma";

export const ColumnRouter = createTRPCRouter({
  create: tableProcedure
    .input(z.object({ tableId: z.string(), name: z.string(), type: z.nativeEnum(ColumnType).optional() }))
    .mutation(async ({ ctx, input }) => {
      return ColumnService.create(ctx.db, input.tableId, input);
    }),

  update: columnProcedure
    .input(z.object({ columnId: z.string(), name: z.string().optional(), type: z.nativeEnum(ColumnType).optional() }))
    .mutation(async ({ ctx, input }) => {
      return ColumnService.update(ctx.db, input.columnId, input);
    }),

  delete: columnProcedure.mutation(async ({ ctx, input }) => {
    return ColumnService.delete(ctx.db, input.columnId);
  }),
});
