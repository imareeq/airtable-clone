import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma';
import { JsonNullValueInputSchema } from '../enums/JsonNullValueInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string(),
  tableId: z.string(),
  filterConfig: z.union([JsonNullValueInputSchema, jsonSchema]).optional(),
  sortConfig: z.union([JsonNullValueInputSchema, jsonSchema]).optional(),
  hiddenColumns: z.union([JsonNullValueInputSchema, jsonSchema]).optional(),
  searchQuery: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional()
}).strict();
export const ViewUncheckedCreateInputObjectSchema: z.ZodType<Prisma.ViewUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.ViewUncheckedCreateInput>;
export const ViewUncheckedCreateInputObjectZodSchema = makeSchema();
