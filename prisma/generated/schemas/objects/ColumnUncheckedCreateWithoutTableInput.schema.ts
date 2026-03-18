import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma';
import { ColumnTypeSchema } from '../enums/ColumnType.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string(),
  type: ColumnTypeSchema.optional(),
  orderIndex: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();
export const ColumnUncheckedCreateWithoutTableInputObjectSchema: z.ZodType<Prisma.ColumnUncheckedCreateWithoutTableInput> = makeSchema() as unknown as z.ZodType<Prisma.ColumnUncheckedCreateWithoutTableInput>;
export const ColumnUncheckedCreateWithoutTableInputObjectZodSchema = makeSchema();
