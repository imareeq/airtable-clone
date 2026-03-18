import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  orderIndex: SortOrderSchema.optional()
}).strict();
export const ColumnAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.ColumnAvgOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.ColumnAvgOrderByAggregateInput>;
export const ColumnAvgOrderByAggregateInputObjectZodSchema = makeSchema();
