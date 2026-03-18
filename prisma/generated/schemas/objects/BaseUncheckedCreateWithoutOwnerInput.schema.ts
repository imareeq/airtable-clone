import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma';
import { BaseColorSchema } from '../enums/BaseColor.schema';
import { TableUncheckedCreateNestedManyWithoutBaseInputObjectSchema as TableUncheckedCreateNestedManyWithoutBaseInputObjectSchema } from './TableUncheckedCreateNestedManyWithoutBaseInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string(),
  color: BaseColorSchema.optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  tables: z.lazy(() => TableUncheckedCreateNestedManyWithoutBaseInputObjectSchema).optional()
}).strict();
export const BaseUncheckedCreateWithoutOwnerInputObjectSchema: z.ZodType<Prisma.BaseUncheckedCreateWithoutOwnerInput> = makeSchema() as unknown as z.ZodType<Prisma.BaseUncheckedCreateWithoutOwnerInput>;
export const BaseUncheckedCreateWithoutOwnerInputObjectZodSchema = makeSchema();
