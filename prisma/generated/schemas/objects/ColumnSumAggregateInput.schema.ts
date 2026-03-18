import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma';


const makeSchema = () => z.object({
  orderIndex: z.literal(true).optional()
}).strict();
export const ColumnSumAggregateInputObjectSchema: z.ZodType<Prisma.ColumnSumAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.ColumnSumAggregateInputType>;
export const ColumnSumAggregateInputObjectZodSchema = makeSchema();
