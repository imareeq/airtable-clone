import { TRPCError } from "@trpc/server";
import { ColumnType } from "generated/prisma";
import { z } from "zod";
import {
  createTRPCRouter,
  baseProcedure,
  tableProcedure,
} from "~/server/api/trpc";
import { ROW_LIMIT, TableService } from "~/services/table-service";

export const SpreadsheetRowSchema = z
  .object({
    id: z.string(),
    row_number: z.coerce.number(),
  })
  .catchall(z.union([z.string(), z.number()]).nullable());

export type SpreadsheetRow = z.infer<typeof SpreadsheetRowSchema>;

export const TableRouter = createTRPCRouter({
  getById: tableProcedure.query(async ({ ctx }) => {
    return ctx.table;
  }),

  getRows: tableProcedure
    .input(
      z.object({
        cursor: z.number().optional(),
        offset: z.number().optional(),
      }),
    )
    .output(
      z.object({
        rows: z.array(SpreadsheetRowSchema),
        nextCursor: z.number().optional(),
        prevCursor: z.number().optional(),
        totalCount: z.number(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const currentOffset = input.offset ?? input.cursor ?? 0;

      const res = await TableService.getRows(
        ctx.db,
        ctx.table.id,
        ctx.table.columns.map((col) => col.id),
        currentOffset,
      );

      const rows = res.map((row, index) => ({
        ...row,
        row_number: currentOffset + index + 1,
      }));

      const totalCount = await TableService.getRowCount(ctx.db, ctx.table.id);

      const nextCursor =
        currentOffset + rows.length < totalCount
          ? currentOffset + rows.length
          : undefined;

      const prevCursor =
        currentOffset > 0 ? Math.max(0, currentOffset - ROW_LIMIT) : undefined;

      return {
        rows,
        nextCursor,
        prevCursor,
        totalCount,
      };
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

      await TableService.updateCell(
        ctx.db,
        ctx.table.id,
        input.rowId,
        input.columnId,
        input.value,
      );

      await TableService.updateSearchVector(
        ctx.db,
        ctx.table.id,
        input.rowId,
        ctx.table.columns.map((c) => c.id),
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

  seedWithFakeData: tableProcedure
    .input(
      z.object({
        numRows: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await TableService.seedTableWithFakeData(
        ctx.db,
        ctx.table.id,
        ctx.table.columns.map((col) => ({
          id: col.id,
          name: col.name,
          type: col.type,
        })),
        input.numRows,
      );
    }),
});
