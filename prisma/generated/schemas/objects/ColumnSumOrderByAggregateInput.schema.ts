import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  orderIndex: SortOrderSchema.optional()
}).strict();
export const ColumnSumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.ColumnSumOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.ColumnSumOrderByAggregateInput>;
export const ColumnSumOrderByAggregateInputObjectZodSchema = makeSchema();
