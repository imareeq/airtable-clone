import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { JsonFilterObjectSchema as JsonFilterObjectSchema } from './JsonFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema'

const viewscalarwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => ViewScalarWhereInputObjectSchema), z.lazy(() => ViewScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => ViewScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => ViewScalarWhereInputObjectSchema), z.lazy(() => ViewScalarWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  name: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  tableId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  filterConfig: z.lazy(() => JsonFilterObjectSchema).optional(),
  sortConfig: z.lazy(() => JsonFilterObjectSchema).optional(),
  hiddenColumns: z.lazy(() => JsonFilterObjectSchema).optional(),
  searchQuery: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const ViewScalarWhereInputObjectSchema: z.ZodType<Prisma.ViewScalarWhereInput> = viewscalarwhereinputSchema as unknown as z.ZodType<Prisma.ViewScalarWhereInput>;
export const ViewScalarWhereInputObjectZodSchema = viewscalarwhereinputSchema;
