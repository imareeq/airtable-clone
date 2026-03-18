import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { ViewCountOrderByAggregateInputObjectSchema as ViewCountOrderByAggregateInputObjectSchema } from './ViewCountOrderByAggregateInput.schema';
import { ViewMaxOrderByAggregateInputObjectSchema as ViewMaxOrderByAggregateInputObjectSchema } from './ViewMaxOrderByAggregateInput.schema';
import { ViewMinOrderByAggregateInputObjectSchema as ViewMinOrderByAggregateInputObjectSchema } from './ViewMinOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  tableId: SortOrderSchema.optional(),
  filterConfig: SortOrderSchema.optional(),
  sortConfig: SortOrderSchema.optional(),
  hiddenColumns: SortOrderSchema.optional(),
  searchQuery: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  _count: z.lazy(() => ViewCountOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => ViewMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => ViewMinOrderByAggregateInputObjectSchema).optional()
}).strict();
export const ViewOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.ViewOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.ViewOrderByWithAggregationInput>;
export const ViewOrderByWithAggregationInputObjectZodSchema = makeSchema();
