import { z } from "zod";
import {
  createTRPCRouter,
  tableProcedure,
  columnProcedure,
} from "~/server/api/trpc";
import { ColumnService } from "~/services/column-service";
import { ColumnType } from "generated/prisma";
import { ColumnModelSchema } from "prisma/generated/schemas";

ColumnModelSchema;

export const ColumnRouter = createTRPCRouter({
  create: tableProcedure
    .input(
      z.object({
        tableId: z.string(),
        name: z.string(),
        type: z.enum(ColumnType).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ColumnService.create(ctx.db, input.tableId, input);
    }),

  createMany: tableProcedure
    .input(
      z.object({
        tableId: z.string(),
        columns: z.array(ColumnModelSchema.pick({ name: true, type: true })),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.$transaction(async (tx) => {
        return await ColumnService.createMany(tx, input.tableId, input.columns);
      });
    }),

  update: columnProcedure
    .input(
      z.object({
        columnId: z.string(),
        name: z.string().optional(),
        type: z.enum(ColumnType).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ColumnService.update(ctx.db, input.columnId, input);
    }),

  delete: columnProcedure.mutation(async ({ ctx, input }) => {
    return ColumnService.delete(ctx.db, input.columnId);
  }),
});
