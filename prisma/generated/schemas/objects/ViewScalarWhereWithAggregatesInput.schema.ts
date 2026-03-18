import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { JsonWithAggregatesFilterObjectSchema as JsonWithAggregatesFilterObjectSchema } from './JsonWithAggregatesFilter.schema';
import { StringNullableWithAggregatesFilterObjectSchema as StringNullableWithAggregatesFilterObjectSchema } from './StringNullableWithAggregatesFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema as DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema'

const viewscalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => ViewScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => ViewScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => ViewScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => ViewScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => ViewScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  name: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  tableId: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  filterConfig: z.lazy(() => JsonWithAggregatesFilterObjectSchema).optional(),
  sortConfig: z.lazy(() => JsonWithAggregatesFilterObjectSchema).optional(),
  hiddenColumns: z.lazy(() => JsonWithAggregatesFilterObjectSchema).optional(),
  searchQuery: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const ViewScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.ViewScalarWhereWithAggregatesInput> = viewscalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.ViewScalarWhereWithAggregatesInput>;
export const ViewScalarWhereWithAggregatesInputObjectZodSchema = viewscalarwherewithaggregatesinputSchema;
