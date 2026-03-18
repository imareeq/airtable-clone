import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma';
import { BaseColorSchema } from '../enums/BaseColor.schema';
import { UserCreateNestedOneWithoutBasesInputObjectSchema as UserCreateNestedOneWithoutBasesInputObjectSchema } from './UserCreateNestedOneWithoutBasesInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string(),
  color: BaseColorSchema.optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  owner: z.lazy(() => UserCreateNestedOneWithoutBasesInputObjectSchema)
}).strict();
export const BaseCreateWithoutTablesInputObjectSchema: z.ZodType<Prisma.BaseCreateWithoutTablesInput> = makeSchema() as unknown as z.ZodType<Prisma.BaseCreateWithoutTablesInput>;
export const BaseCreateWithoutTablesInputObjectZodSchema = makeSchema();
