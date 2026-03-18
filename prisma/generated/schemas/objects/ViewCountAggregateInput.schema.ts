import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  name: z.literal(true).optional(),
  tableId: z.literal(true).optional(),
  filterConfig: z.literal(true).optional(),
  sortConfig: z.literal(true).optional(),
  hiddenColumns: z.literal(true).optional(),
  searchQuery: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional(),
  _all: z.literal(true).optional()
}).strict();
export const ViewCountAggregateInputObjectSchema: z.ZodType<Prisma.ViewCountAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.ViewCountAggregateInputType>;
export const ViewCountAggregateInputObjectZodSchema = makeSchema();
