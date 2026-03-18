import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma';
import { BaseColorSchema } from '../enums/BaseColor.schema';
import { TableCreateNestedManyWithoutBaseInputObjectSchema as TableCreateNestedManyWithoutBaseInputObjectSchema } from './TableCreateNestedManyWithoutBaseInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string(),
  color: BaseColorSchema.optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  tables: z.lazy(() => TableCreateNestedManyWithoutBaseInputObjectSchema).optional()
}).strict();
export const BaseCreateWithoutOwnerInputObjectSchema: z.ZodType<Prisma.BaseCreateWithoutOwnerInput> = makeSchema() as unknown as z.ZodType<Prisma.BaseCreateWithoutOwnerInput>;
export const BaseCreateWithoutOwnerInputObjectZodSchema = makeSchema();
