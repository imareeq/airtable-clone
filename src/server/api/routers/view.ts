import { TRPCError } from "@trpc/server";
import { z } from "zod";
import {
  createTRPCRouter,
  tableProcedure,
  viewProcedure,
} from "~/server/api/trpc";
import { ViewService } from "~/services/view-service";

export const ViewRouter = createTRPCRouter({
  getById: viewProcedure.query(async ({ ctx }) => {
    return ctx.view;
  }),
  create: tableProcedure
    .input(z.object({ tableId: z.string(), name: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ViewService.create(ctx.db, input.tableId, input.name);
    }),

  update: viewProcedure
    .input(
      z.object({
        viewId: z.string(),
        name: z.string().optional(),
        filterConfig: z.any().optional(),
        sortConfig: z.any().optional(),
        hiddenColumns: z.any().optional(),
        searchQuery: z.string().optional().nullable(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ViewService.update(ctx.db, input.viewId, input);
    }),

  delete: viewProcedure
    .input(z.object({ viewId: z.string(), tableId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const viewCount = await ctx.db.view.count({
        where: { tableId: input.tableId },
      });

      if (viewCount <= 1) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Cannot delete the last view in a table",
        });
      }

      return ViewService.delete(ctx.db, input.viewId);
    }),
});
