import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma';


const makeSchema = () => z.object({
  orderIndex: z.literal(true).optional()
}).strict();
export const TableAvgAggregateInputObjectSchema: z.ZodType<Prisma.TableAvgAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.TableAvgAggregateInputType>;
export const TableAvgAggregateInputObjectZodSchema = makeSchema();
