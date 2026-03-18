import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { IntFieldUpdateOperationsInputObjectSchema as IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { ViewUncheckedUpdateManyWithoutTableNestedInputObjectSchema as ViewUncheckedUpdateManyWithoutTableNestedInputObjectSchema } from './ViewUncheckedUpdateManyWithoutTableNestedInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  orderIndex: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)]).optional(),
  baseId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  views: z.lazy(() => ViewUncheckedUpdateManyWithoutTableNestedInputObjectSchema).optional()
}).strict();
export const TableUncheckedUpdateWithoutColumnsInputObjectSchema: z.ZodType<Prisma.TableUncheckedUpdateWithoutColumnsInput> = makeSchema() as unknown as z.ZodType<Prisma.TableUncheckedUpdateWithoutColumnsInput>;
export const TableUncheckedUpdateWithoutColumnsInputObjectZodSchema = makeSchema();
