import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  color: SortOrderSchema.optional(),
  ownerId: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const BaseMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.BaseMinOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.BaseMinOrderByAggregateInput>;
export const BaseMinOrderByAggregateInputObjectZodSchema = makeSchema();
