import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma';
import { ColumnTypeSchema } from '../enums/ColumnType.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string(),
  type: ColumnTypeSchema.optional(),
  orderIndex: z.number().int().optional(),
  tableId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();
export const ColumnCreateManyInputObjectSchema: z.ZodType<Prisma.ColumnCreateManyInput> = makeSchema() as unknown as z.ZodType<Prisma.ColumnCreateManyInput>;
export const ColumnCreateManyInputObjectZodSchema = makeSchema();
