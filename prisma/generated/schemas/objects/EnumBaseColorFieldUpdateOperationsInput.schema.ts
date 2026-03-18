import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma';
import { BaseColorSchema } from '../enums/BaseColor.schema'

const makeSchema = () => z.object({
  set: BaseColorSchema.optional()
}).strict();
export const EnumBaseColorFieldUpdateOperationsInputObjectSchema: z.ZodType<Prisma.EnumBaseColorFieldUpdateOperationsInput> = makeSchema() as unknown as z.ZodType<Prisma.EnumBaseColorFieldUpdateOperationsInput>;
export const EnumBaseColorFieldUpdateOperationsInputObjectZodSchema = makeSchema();
