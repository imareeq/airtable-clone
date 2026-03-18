import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { TableOrderByWithRelationInputObjectSchema as TableOrderByWithRelationInputObjectSchema } from './TableOrderByWithRelationInput.schema'

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
  table: z.lazy(() => TableOrderByWithRelationInputObjectSchema).optional()
}).strict();
export const ViewOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.ViewOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.ViewOrderByWithRelationInput>;
export const ViewOrderByWithRelationInputObjectZodSchema = makeSchema();
