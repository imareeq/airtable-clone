import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  orderIndex: SortOrderSchema.optional(),
  baseId: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const TableCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.TableCountOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.TableCountOrderByAggregateInput>;
export const TableCountOrderByAggregateInputObjectZodSchema = makeSchema();
