import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma';
import { BaseColorSchema } from '../enums/BaseColor.schema';
import { UserCreateNestedOneWithoutBasesInputObjectSchema as UserCreateNestedOneWithoutBasesInputObjectSchema } from './UserCreateNestedOneWithoutBasesInput.schema';
import { TableCreateNestedManyWithoutBaseInputObjectSchema as TableCreateNestedManyWithoutBaseInputObjectSchema } from './TableCreateNestedManyWithoutBaseInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string(),
  color: BaseColorSchema.optional(),
  createdAt: z.coerce.date().optional(),
  owner: z.lazy(() => UserCreateNestedOneWithoutBasesInputObjectSchema),
  tables: z.lazy(() => TableCreateNestedManyWithoutBaseInputObjectSchema).optional()
}).strict();
export const BaseCreateInputObjectSchema: z.ZodType<Prisma.BaseCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.BaseCreateInput>;
export const BaseCreateInputObjectZodSchema = makeSchema();
