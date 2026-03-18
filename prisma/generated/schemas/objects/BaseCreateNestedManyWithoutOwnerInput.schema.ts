import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma';
import { BaseCreateWithoutOwnerInputObjectSchema as BaseCreateWithoutOwnerInputObjectSchema } from './BaseCreateWithoutOwnerInput.schema';
import { BaseUncheckedCreateWithoutOwnerInputObjectSchema as BaseUncheckedCreateWithoutOwnerInputObjectSchema } from './BaseUncheckedCreateWithoutOwnerInput.schema';
import { BaseCreateOrConnectWithoutOwnerInputObjectSchema as BaseCreateOrConnectWithoutOwnerInputObjectSchema } from './BaseCreateOrConnectWithoutOwnerInput.schema';
import { BaseCreateManyOwnerInputEnvelopeObjectSchema as BaseCreateManyOwnerInputEnvelopeObjectSchema } from './BaseCreateManyOwnerInputEnvelope.schema';
import { BaseWhereUniqueInputObjectSchema as BaseWhereUniqueInputObjectSchema } from './BaseWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => BaseCreateWithoutOwnerInputObjectSchema), z.lazy(() => BaseCreateWithoutOwnerInputObjectSchema).array(), z.lazy(() => BaseUncheckedCreateWithoutOwnerInputObjectSchema), z.lazy(() => BaseUncheckedCreateWithoutOwnerInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => BaseCreateOrConnectWithoutOwnerInputObjectSchema), z.lazy(() => BaseCreateOrConnectWithoutOwnerInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => BaseCreateManyOwnerInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => BaseWhereUniqueInputObjectSchema), z.lazy(() => BaseWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const BaseCreateNestedManyWithoutOwnerInputObjectSchema: z.ZodType<Prisma.BaseCreateNestedManyWithoutOwnerInput> = makeSchema() as unknown as z.ZodType<Prisma.BaseCreateNestedManyWithoutOwnerInput>;
export const BaseCreateNestedManyWithoutOwnerInputObjectZodSchema = makeSchema();
