import { TRPCError } from "@trpc/server";
import { ColumnType } from "generated/prisma";
import { z } from "zod";
import {
  createTRPCRouter,
  baseProcedure,
  tableProcedure,
} from "~/server/api/trpc";
import { TableService } from "~/services/table-service";

export type SpreadsheetRow = { id: string } & Record<string, string>;

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

  createRow: tableProcedure.mutation(async ({ ctx }) => {
    return TableService.createRow(ctx.db, ctx.table.id);
  }),

  deleteRow: tableProcedure
    .input(z.object({ tableId: z.string(), rowId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return TableService.deleteRow(ctx.db, ctx.table.id, input.rowId);
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

  updateCell: tableProcedure
    .input(
      z.object({
        tableId: z.string(),
        rowId: z.string(),
        columnId: z.string(),
        value: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const validColumn = ctx.table.columns.find(
        (c) => c.id === input.columnId,
      );

      if (!validColumn) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Column not found",
        });
      }

      if (validColumn.type === ColumnType.NUMBER && input.value !== "") {
        const parsed = z.coerce.number().safeParse(input.value);
        if (!parsed.success) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Value must be a number",
          });
        }
      }

      return TableService.updateCell(
        ctx.db,
        ctx.table.id,
        input.rowId,
        input.columnId,
        input.value,
      );
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
