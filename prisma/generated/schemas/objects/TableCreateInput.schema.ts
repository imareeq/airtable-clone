import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma';
import { BaseCreateNestedOneWithoutTablesInputObjectSchema as BaseCreateNestedOneWithoutTablesInputObjectSchema } from './BaseCreateNestedOneWithoutTablesInput.schema';
import { ColumnCreateNestedManyWithoutTableInputObjectSchema as ColumnCreateNestedManyWithoutTableInputObjectSchema } from './ColumnCreateNestedManyWithoutTableInput.schema';
import { ViewCreateNestedManyWithoutTableInputObjectSchema as ViewCreateNestedManyWithoutTableInputObjectSchema } from './ViewCreateNestedManyWithoutTableInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string(),
  orderIndex: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  base: z.lazy(() => BaseCreateNestedOneWithoutTablesInputObjectSchema),
  columns: z.lazy(() => ColumnCreateNestedManyWithoutTableInputObjectSchema).optional(),
  views: z.lazy(() => ViewCreateNestedManyWithoutTableInputObjectSchema).optional()
}).strict();
export const TableCreateInputObjectSchema: z.ZodType<Prisma.TableCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.TableCreateInput>;
export const TableCreateInputObjectZodSchema = makeSchema();
