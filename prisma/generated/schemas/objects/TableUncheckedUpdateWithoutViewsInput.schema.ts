import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { IntFieldUpdateOperationsInputObjectSchema as IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { ColumnUncheckedUpdateManyWithoutTableNestedInputObjectSchema as ColumnUncheckedUpdateManyWithoutTableNestedInputObjectSchema } from './ColumnUncheckedUpdateManyWithoutTableNestedInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  orderIndex: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)]).optional(),
  baseId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  columns: z.lazy(() => ColumnUncheckedUpdateManyWithoutTableNestedInputObjectSchema).optional()
}).strict();
export const TableUncheckedUpdateWithoutViewsInputObjectSchema: z.ZodType<Prisma.TableUncheckedUpdateWithoutViewsInput> = makeSchema() as unknown as z.ZodType<Prisma.TableUncheckedUpdateWithoutViewsInput>;
export const TableUncheckedUpdateWithoutViewsInputObjectZodSchema = makeSchema();
