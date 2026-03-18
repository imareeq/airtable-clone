import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { TableOrderByWithRelationInputObjectSchema as TableOrderByWithRelationInputObjectSchema } from './TableOrderByWithRelationInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  type: SortOrderSchema.optional(),
  orderIndex: SortOrderSchema.optional(),
  tableId: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  table: z.lazy(() => TableOrderByWithRelationInputObjectSchema).optional()
}).strict();
export const ColumnOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.ColumnOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.ColumnOrderByWithRelationInput>;
export const ColumnOrderByWithRelationInputObjectZodSchema = makeSchema();
