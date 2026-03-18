import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { EnumColumnTypeWithAggregatesFilterObjectSchema as EnumColumnTypeWithAggregatesFilterObjectSchema } from './EnumColumnTypeWithAggregatesFilter.schema';
import { ColumnTypeSchema } from '../enums/ColumnType.schema';
import { IntWithAggregatesFilterObjectSchema as IntWithAggregatesFilterObjectSchema } from './IntWithAggregatesFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema as DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema'

const columnscalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => ColumnScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => ColumnScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => ColumnScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => ColumnScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => ColumnScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  name: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  type: z.union([z.lazy(() => EnumColumnTypeWithAggregatesFilterObjectSchema), ColumnTypeSchema]).optional(),
  orderIndex: z.union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number().int()]).optional(),
  tableId: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const ColumnScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.ColumnScalarWhereWithAggregatesInput> = columnscalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.ColumnScalarWhereWithAggregatesInput>;
export const ColumnScalarWhereWithAggregatesInputObjectZodSchema = columnscalarwherewithaggregatesinputSchema;
