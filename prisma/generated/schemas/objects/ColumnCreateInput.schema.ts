import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma';
import { ColumnTypeSchema } from '../enums/ColumnType.schema';
import { TableCreateNestedOneWithoutColumnsInputObjectSchema as TableCreateNestedOneWithoutColumnsInputObjectSchema } from './TableCreateNestedOneWithoutColumnsInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string(),
  type: ColumnTypeSchema.optional(),
  orderIndex: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  table: z.lazy(() => TableCreateNestedOneWithoutColumnsInputObjectSchema)
}).strict();
export const ColumnCreateInputObjectSchema: z.ZodType<Prisma.ColumnCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.ColumnCreateInput>;
export const ColumnCreateInputObjectZodSchema = makeSchema();
