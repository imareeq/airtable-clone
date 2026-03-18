import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma';


const makeSchema = () => z.object({
  orderIndex: z.literal(true).optional()
}).strict();
export const TableSumAggregateInputObjectSchema: z.ZodType<Prisma.TableSumAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.TableSumAggregateInputType>;
export const TableSumAggregateInputObjectZodSchema = makeSchema();
