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
export const ColumnMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.ColumnMinOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.ColumnMinOrderByAggregateInput>;
export const ColumnMinOrderByAggregateInputObjectZodSchema = makeSchema();
