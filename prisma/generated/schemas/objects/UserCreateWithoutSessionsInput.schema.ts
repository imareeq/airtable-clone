import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma';
import { AccountCreateNestedManyWithoutUserInputObjectSchema as AccountCreateNestedManyWithoutUserInputObjectSchema } from './AccountCreateNestedManyWithoutUserInput.schema';
import { BaseCreateNestedManyWithoutOwnerInputObjectSchema as BaseCreateNestedManyWithoutOwnerInputObjectSchema } from './BaseCreateNestedManyWithoutOwnerInput.schema'

const makeSchema = () => z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.boolean().optional(),
  image: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputObjectSchema).optional(),
  bases: z.lazy(() => BaseCreateNestedManyWithoutOwnerInputObjectSchema).optional()
}).strict();
export const UserCreateWithoutSessionsInputObjectSchema: z.ZodType<Prisma.UserCreateWithoutSessionsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateWithoutSessionsInput>;
export const UserCreateWithoutSessionsInputObjectZodSchema = makeSchema();
