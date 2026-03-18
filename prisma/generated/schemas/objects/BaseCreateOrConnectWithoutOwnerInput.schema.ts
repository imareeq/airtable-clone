import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma';
import { BaseWhereUniqueInputObjectSchema as BaseWhereUniqueInputObjectSchema } from './BaseWhereUniqueInput.schema';
import { BaseCreateWithoutOwnerInputObjectSchema as BaseCreateWithoutOwnerInputObjectSchema } from './BaseCreateWithoutOwnerInput.schema';
import { BaseUncheckedCreateWithoutOwnerInputObjectSchema as BaseUncheckedCreateWithoutOwnerInputObjectSchema } from './BaseUncheckedCreateWithoutOwnerInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => BaseWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => BaseCreateWithoutOwnerInputObjectSchema), z.lazy(() => BaseUncheckedCreateWithoutOwnerInputObjectSchema)])
}).strict();
export const BaseCreateOrConnectWithoutOwnerInputObjectSchema: z.ZodType<Prisma.BaseCreateOrConnectWithoutOwnerInput> = makeSchema() as unknown as z.ZodType<Prisma.BaseCreateOrConnectWithoutOwnerInput>;
export const BaseCreateOrConnectWithoutOwnerInputObjectZodSchema = makeSchema();
