import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma';
import { ColumnUncheckedCreateNestedManyWithoutTableInputObjectSchema as ColumnUncheckedCreateNestedManyWithoutTableInputObjectSchema } from './ColumnUncheckedCreateNestedManyWithoutTableInput.schema';
import { ViewUncheckedCreateNestedManyWithoutTableInputObjectSchema as ViewUncheckedCreateNestedManyWithoutTableInputObjectSchema } from './ViewUncheckedCreateNestedManyWithoutTableInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string(),
  orderIndex: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  columns: z.lazy(() => ColumnUncheckedCreateNestedManyWithoutTableInputObjectSchema).optional(),
  views: z.lazy(() => ViewUncheckedCreateNestedManyWithoutTableInputObjectSchema).optional()
}).strict();
export const TableUncheckedCreateWithoutBaseInputObjectSchema: z.ZodType<Prisma.TableUncheckedCreateWithoutBaseInput> = makeSchema() as unknown as z.ZodType<Prisma.TableUncheckedCreateWithoutBaseInput>;
export const TableUncheckedCreateWithoutBaseInputObjectZodSchema = makeSchema();
