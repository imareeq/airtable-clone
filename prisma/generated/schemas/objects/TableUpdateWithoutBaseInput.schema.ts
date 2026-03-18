import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { IntFieldUpdateOperationsInputObjectSchema as IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { ColumnUpdateManyWithoutTableNestedInputObjectSchema as ColumnUpdateManyWithoutTableNestedInputObjectSchema } from './ColumnUpdateManyWithoutTableNestedInput.schema';
import { ViewUpdateManyWithoutTableNestedInputObjectSchema as ViewUpdateManyWithoutTableNestedInputObjectSchema } from './ViewUpdateManyWithoutTableNestedInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  orderIndex: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)]).optional(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  columns: z.lazy(() => ColumnUpdateManyWithoutTableNestedInputObjectSchema).optional(),
  views: z.lazy(() => ViewUpdateManyWithoutTableNestedInputObjectSchema).optional()
}).strict();
export const TableUpdateWithoutBaseInputObjectSchema: z.ZodType<Prisma.TableUpdateWithoutBaseInput> = makeSchema() as unknown as z.ZodType<Prisma.TableUpdateWithoutBaseInput>;
export const TableUpdateWithoutBaseInputObjectZodSchema = makeSchema();
