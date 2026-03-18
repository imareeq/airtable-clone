import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma';
import { ColumnUncheckedCreateNestedManyWithoutTableInputObjectSchema as ColumnUncheckedCreateNestedManyWithoutTableInputObjectSchema } from './ColumnUncheckedCreateNestedManyWithoutTableInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string(),
  orderIndex: z.number().int().optional(),
  baseId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  columns: z.lazy(() => ColumnUncheckedCreateNestedManyWithoutTableInputObjectSchema).optional()
}).strict();
export const TableUncheckedCreateWithoutViewsInputObjectSchema: z.ZodType<Prisma.TableUncheckedCreateWithoutViewsInput> = makeSchema() as unknown as z.ZodType<Prisma.TableUncheckedCreateWithoutViewsInput>;
export const TableUncheckedCreateWithoutViewsInputObjectZodSchema = makeSchema();
