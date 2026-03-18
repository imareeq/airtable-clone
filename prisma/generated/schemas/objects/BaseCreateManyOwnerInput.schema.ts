import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma';
import { BaseColorSchema } from '../enums/BaseColor.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string(),
  color: BaseColorSchema.optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();
export const BaseCreateManyOwnerInputObjectSchema: z.ZodType<Prisma.BaseCreateManyOwnerInput> = makeSchema() as unknown as z.ZodType<Prisma.BaseCreateManyOwnerInput>;
export const BaseCreateManyOwnerInputObjectZodSchema = makeSchema();
