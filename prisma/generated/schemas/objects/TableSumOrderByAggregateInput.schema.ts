import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  orderIndex: SortOrderSchema.optional()
}).strict();
export const TableSumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.TableSumOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.TableSumOrderByAggregateInput>;
export const TableSumOrderByAggregateInputObjectZodSchema = makeSchema();
