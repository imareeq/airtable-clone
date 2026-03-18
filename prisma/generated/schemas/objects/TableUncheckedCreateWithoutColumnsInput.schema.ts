import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma';
import { ViewUncheckedCreateNestedManyWithoutTableInputObjectSchema as ViewUncheckedCreateNestedManyWithoutTableInputObjectSchema } from './ViewUncheckedCreateNestedManyWithoutTableInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string(),
  orderIndex: z.number().int().optional(),
  baseId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  views: z.lazy(() => ViewUncheckedCreateNestedManyWithoutTableInputObjectSchema).optional()
}).strict();
export const TableUncheckedCreateWithoutColumnsInputObjectSchema: z.ZodType<Prisma.TableUncheckedCreateWithoutColumnsInput> = makeSchema() as unknown as z.ZodType<Prisma.TableUncheckedCreateWithoutColumnsInput>;
export const TableUncheckedCreateWithoutColumnsInputObjectZodSchema = makeSchema();
