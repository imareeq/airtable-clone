import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { TableUncheckedUpdateManyWithoutBaseNestedInputObjectSchema as TableUncheckedUpdateManyWithoutBaseNestedInputObjectSchema } from './TableUncheckedUpdateManyWithoutBaseNestedInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  color: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  tables: z.lazy(() => TableUncheckedUpdateManyWithoutBaseNestedInputObjectSchema).optional()
}).strict();
export const BaseUncheckedUpdateWithoutOwnerInputObjectSchema: z.ZodType<Prisma.BaseUncheckedUpdateWithoutOwnerInput> = makeSchema() as unknown as z.ZodType<Prisma.BaseUncheckedUpdateWithoutOwnerInput>;
export const BaseUncheckedUpdateWithoutOwnerInputObjectZodSchema = makeSchema();
