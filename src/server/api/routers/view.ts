import { z } from "zod";
import { createTRPCRouter, tableProcedure, viewProcedure } from "~/server/api/trpc";
import { ViewService } from "~/services/view-service";

export const ViewRouter = createTRPCRouter({
  create: tableProcedure
    .input(z.object({ tableId: z.string(), name: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ViewService.create(ctx.db, input.tableId, input.name);
    }),

  update: viewProcedure
    .input(z.object({ 
      viewId: z.string(), 
      name: z.string().optional(),
      filterConfig: z.any().optional(),
      sortConfig: z.any().optional(),
      hiddenColumns: z.any().optional(),
      searchQuery: z.string().optional().nullable(),
    }))
    .mutation(async ({ ctx, input }) => {
      return ViewService.update(ctx.db, input.viewId, input);
    }),

  delete: viewProcedure.mutation(async ({ ctx, input }) => {
    return ViewService.delete(ctx.db, input.viewId);
  }),
});
