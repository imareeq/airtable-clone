import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { ColumnTypeSchema } from '../enums/ColumnType.schema';
import { EnumColumnTypeFieldUpdateOperationsInputObjectSchema as EnumColumnTypeFieldUpdateOperationsInputObjectSchema } from './EnumColumnTypeFieldUpdateOperationsInput.schema';
import { IntFieldUpdateOperationsInputObjectSchema as IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { TableUpdateOneRequiredWithoutColumnsNestedInputObjectSchema as TableUpdateOneRequiredWithoutColumnsNestedInputObjectSchema } from './TableUpdateOneRequiredWithoutColumnsNestedInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  type: z.union([ColumnTypeSchema, z.lazy(() => EnumColumnTypeFieldUpdateOperationsInputObjectSchema)]).optional(),
  orderIndex: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)]).optional(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  table: z.lazy(() => TableUpdateOneRequiredWithoutColumnsNestedInputObjectSchema).optional()
}).strict();
export const ColumnUpdateInputObjectSchema: z.ZodType<Prisma.ColumnUpdateInput> = makeSchema() as unknown as z.ZodType<Prisma.ColumnUpdateInput>;
export const ColumnUpdateInputObjectZodSchema = makeSchema();
