import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma';
import { TableArgsObjectSchema as TableArgsObjectSchema } from './TableArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  tableId: z.boolean().optional(),
  table: z.union([z.boolean(), z.lazy(() => TableArgsObjectSchema)]).optional(),
  filterConfig: z.boolean().optional(),
  sortConfig: z.boolean().optional(),
  hiddenColumns: z.boolean().optional(),
  searchQuery: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional()
}).strict();
export const ViewSelectObjectSchema: z.ZodType<Prisma.ViewSelect> = makeSchema() as unknown as z.ZodType<Prisma.ViewSelect>;
export const ViewSelectObjectZodSchema = makeSchema();
