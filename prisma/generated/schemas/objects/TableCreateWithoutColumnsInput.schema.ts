import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma';
import { BaseCreateNestedOneWithoutTablesInputObjectSchema as BaseCreateNestedOneWithoutTablesInputObjectSchema } from './BaseCreateNestedOneWithoutTablesInput.schema';
import { ViewCreateNestedManyWithoutTableInputObjectSchema as ViewCreateNestedManyWithoutTableInputObjectSchema } from './ViewCreateNestedManyWithoutTableInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string(),
  orderIndex: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  base: z.lazy(() => BaseCreateNestedOneWithoutTablesInputObjectSchema),
  views: z.lazy(() => ViewCreateNestedManyWithoutTableInputObjectSchema).optional()
}).strict();
export const TableCreateWithoutColumnsInputObjectSchema: z.ZodType<Prisma.TableCreateWithoutColumnsInput> = makeSchema() as unknown as z.ZodType<Prisma.TableCreateWithoutColumnsInput>;
export const TableCreateWithoutColumnsInputObjectZodSchema = makeSchema();
