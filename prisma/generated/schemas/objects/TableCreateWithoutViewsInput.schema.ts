import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma';
import { BaseCreateNestedOneWithoutTablesInputObjectSchema as BaseCreateNestedOneWithoutTablesInputObjectSchema } from './BaseCreateNestedOneWithoutTablesInput.schema';
import { ColumnCreateNestedManyWithoutTableInputObjectSchema as ColumnCreateNestedManyWithoutTableInputObjectSchema } from './ColumnCreateNestedManyWithoutTableInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string(),
  orderIndex: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  base: z.lazy(() => BaseCreateNestedOneWithoutTablesInputObjectSchema),
  columns: z.lazy(() => ColumnCreateNestedManyWithoutTableInputObjectSchema).optional()
}).strict();
export const TableCreateWithoutViewsInputObjectSchema: z.ZodType<Prisma.TableCreateWithoutViewsInput> = makeSchema() as unknown as z.ZodType<Prisma.TableCreateWithoutViewsInput>;
export const TableCreateWithoutViewsInputObjectZodSchema = makeSchema();
