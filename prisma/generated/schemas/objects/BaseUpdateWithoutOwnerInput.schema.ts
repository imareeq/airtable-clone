import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { BaseColorSchema } from '../enums/BaseColor.schema';
import { EnumBaseColorFieldUpdateOperationsInputObjectSchema as EnumBaseColorFieldUpdateOperationsInputObjectSchema } from './EnumBaseColorFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { TableUpdateManyWithoutBaseNestedInputObjectSchema as TableUpdateManyWithoutBaseNestedInputObjectSchema } from './TableUpdateManyWithoutBaseNestedInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  color: z.union([BaseColorSchema, z.lazy(() => EnumBaseColorFieldUpdateOperationsInputObjectSchema)]).optional(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  tables: z.lazy(() => TableUpdateManyWithoutBaseNestedInputObjectSchema).optional()
}).strict();
export const BaseUpdateWithoutOwnerInputObjectSchema: z.ZodType<Prisma.BaseUpdateWithoutOwnerInput> = makeSchema() as unknown as z.ZodType<Prisma.BaseUpdateWithoutOwnerInput>;
export const BaseUpdateWithoutOwnerInputObjectZodSchema = makeSchema();
