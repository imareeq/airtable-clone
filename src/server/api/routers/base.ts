import { z } from "zod";
import { createTRPCRouter, protectedProcedure, baseProcedure } from "~/server/api/trpc";
import { BaseService } from "~/services/base-service";
import { BaseColor } from "../../../../generated/prisma";

export const BaseRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    return BaseService.getAll(ctx.db, ctx.session.user.id);
  }),

  getById: baseProcedure.query(async ({ ctx }) => {
    return ctx.base;
  }),

  create: protectedProcedure
    .input(z.object({ name: z.string(), color: z.nativeEnum(BaseColor).optional() }))
    .mutation(async ({ ctx, input }) => {
      return BaseService.create(ctx.db, ctx.session.user.id, input);
    }),

  update: baseProcedure
    .input(z.object({ baseId: z.string(), name: z.string().optional(), color: z.nativeEnum(BaseColor).optional() }))
    .mutation(async ({ ctx, input }) => {
      return BaseService.update(ctx.db, input.baseId, input);
    }),

  delete: baseProcedure.mutation(async ({ ctx, input }) => {
    return BaseService.delete(ctx.db, input.baseId);
  }),
});
