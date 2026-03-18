import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  type: SortOrderSchema.optional(),
  orderIndex: SortOrderSchema.optional(),
  tableId: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const ColumnMaxOrderByAggregateInputObjectSchema: z.ZodType<Prisma.ColumnMaxOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.ColumnMaxOrderByAggregateInput>;
export const ColumnMaxOrderByAggregateInputObjectZodSchema = makeSchema();
