import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma';
import { JsonNullValueInputSchema } from '../enums/JsonNullValueInput.schema';
import { TableCreateNestedOneWithoutViewsInputObjectSchema as TableCreateNestedOneWithoutViewsInputObjectSchema } from './TableCreateNestedOneWithoutViewsInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string(),
  filterConfig: z.union([JsonNullValueInputSchema, jsonSchema]).optional(),
  sortConfig: z.union([JsonNullValueInputSchema, jsonSchema]).optional(),
  hiddenColumns: z.union([JsonNullValueInputSchema, jsonSchema]).optional(),
  searchQuery: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  table: z.lazy(() => TableCreateNestedOneWithoutViewsInputObjectSchema)
}).strict();
export const ViewCreateInputObjectSchema: z.ZodType<Prisma.ViewCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.ViewCreateInput>;
export const ViewCreateInputObjectZodSchema = makeSchema();
