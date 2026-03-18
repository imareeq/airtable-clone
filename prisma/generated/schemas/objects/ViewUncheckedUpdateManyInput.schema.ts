import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { JsonNullValueInputSchema } from '../enums/JsonNullValueInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema as NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  tableId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  filterConfig: z.union([JsonNullValueInputSchema, jsonSchema]).optional(),
  sortConfig: z.union([JsonNullValueInputSchema, jsonSchema]).optional(),
  hiddenColumns: z.union([JsonNullValueInputSchema, jsonSchema]).optional(),
  searchQuery: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional()
}).strict();
export const ViewUncheckedUpdateManyInputObjectSchema: z.ZodType<Prisma.ViewUncheckedUpdateManyInput> = makeSchema() as unknown as z.ZodType<Prisma.ViewUncheckedUpdateManyInput>;
export const ViewUncheckedUpdateManyInputObjectZodSchema = makeSchema();
