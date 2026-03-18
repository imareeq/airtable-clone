import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  name: z.literal(true).optional(),
  color: z.literal(true).optional(),
  ownerId: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional()
}).strict();
export const BaseMinAggregateInputObjectSchema: z.ZodType<Prisma.BaseMinAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.BaseMinAggregateInputType>;
export const BaseMinAggregateInputObjectZodSchema = makeSchema();
