import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { BaseColorSchema } from '../enums/BaseColor.schema';
import { EnumBaseColorFieldUpdateOperationsInputObjectSchema as EnumBaseColorFieldUpdateOperationsInputObjectSchema } from './EnumBaseColorFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  color: z.union([BaseColorSchema, z.lazy(() => EnumBaseColorFieldUpdateOperationsInputObjectSchema)]).optional(),
  ownerId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional()
}).strict();
export const BaseUncheckedUpdateWithoutTablesInputObjectSchema: z.ZodType<Prisma.BaseUncheckedUpdateWithoutTablesInput> = makeSchema() as unknown as z.ZodType<Prisma.BaseUncheckedUpdateWithoutTablesInput>;
export const BaseUncheckedUpdateWithoutTablesInputObjectZodSchema = makeSchema();
