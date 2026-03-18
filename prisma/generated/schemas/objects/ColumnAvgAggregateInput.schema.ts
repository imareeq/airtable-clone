import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma';


const makeSchema = () => z.object({
  orderIndex: z.literal(true).optional()
}).strict();
export const ColumnAvgAggregateInputObjectSchema: z.ZodType<Prisma.ColumnAvgAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.ColumnAvgAggregateInputType>;
export const ColumnAvgAggregateInputObjectZodSchema = makeSchema();
