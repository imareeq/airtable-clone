import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma';
import { ColumnCreateNestedManyWithoutTableInputObjectSchema as ColumnCreateNestedManyWithoutTableInputObjectSchema } from './ColumnCreateNestedManyWithoutTableInput.schema';
import { ViewCreateNestedManyWithoutTableInputObjectSchema as ViewCreateNestedManyWithoutTableInputObjectSchema } from './ViewCreateNestedManyWithoutTableInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string(),
  orderIndex: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  columns: z.lazy(() => ColumnCreateNestedManyWithoutTableInputObjectSchema).optional(),
  views: z.lazy(() => ViewCreateNestedManyWithoutTableInputObjectSchema).optional()
}).strict();
export const TableCreateWithoutBaseInputObjectSchema: z.ZodType<Prisma.TableCreateWithoutBaseInput> = makeSchema() as unknown as z.ZodType<Prisma.TableCreateWithoutBaseInput>;
export const TableCreateWithoutBaseInputObjectZodSchema = makeSchema();
