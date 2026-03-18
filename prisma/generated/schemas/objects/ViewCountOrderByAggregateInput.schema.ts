import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  tableId: SortOrderSchema.optional(),
  filterConfig: SortOrderSchema.optional(),
  sortConfig: SortOrderSchema.optional(),
  hiddenColumns: SortOrderSchema.optional(),
  searchQuery: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const ViewCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.ViewCountOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.ViewCountOrderByAggregateInput>;
export const ViewCountOrderByAggregateInputObjectZodSchema = makeSchema();
