import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma';
import { BaseCreateWithoutOwnerInputObjectSchema as BaseCreateWithoutOwnerInputObjectSchema } from './BaseCreateWithoutOwnerInput.schema';
import { BaseUncheckedCreateWithoutOwnerInputObjectSchema as BaseUncheckedCreateWithoutOwnerInputObjectSchema } from './BaseUncheckedCreateWithoutOwnerInput.schema';
import { BaseCreateOrConnectWithoutOwnerInputObjectSchema as BaseCreateOrConnectWithoutOwnerInputObjectSchema } from './BaseCreateOrConnectWithoutOwnerInput.schema';
import { BaseUpsertWithWhereUniqueWithoutOwnerInputObjectSchema as BaseUpsertWithWhereUniqueWithoutOwnerInputObjectSchema } from './BaseUpsertWithWhereUniqueWithoutOwnerInput.schema';
import { BaseCreateManyOwnerInputEnvelopeObjectSchema as BaseCreateManyOwnerInputEnvelopeObjectSchema } from './BaseCreateManyOwnerInputEnvelope.schema';
import { BaseWhereUniqueInputObjectSchema as BaseWhereUniqueInputObjectSchema } from './BaseWhereUniqueInput.schema';
import { BaseUpdateWithWhereUniqueWithoutOwnerInputObjectSchema as BaseUpdateWithWhereUniqueWithoutOwnerInputObjectSchema } from './BaseUpdateWithWhereUniqueWithoutOwnerInput.schema';
import { BaseUpdateManyWithWhereWithoutOwnerInputObjectSchema as BaseUpdateManyWithWhereWithoutOwnerInputObjectSchema } from './BaseUpdateManyWithWhereWithoutOwnerInput.schema';
import { BaseScalarWhereInputObjectSchema as BaseScalarWhereInputObjectSchema } from './BaseScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => BaseCreateWithoutOwnerInputObjectSchema), z.lazy(() => BaseCreateWithoutOwnerInputObjectSchema).array(), z.lazy(() => BaseUncheckedCreateWithoutOwnerInputObjectSchema), z.lazy(() => BaseUncheckedCreateWithoutOwnerInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => BaseCreateOrConnectWithoutOwnerInputObjectSchema), z.lazy(() => BaseCreateOrConnectWithoutOwnerInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => BaseUpsertWithWhereUniqueWithoutOwnerInputObjectSchema), z.lazy(() => BaseUpsertWithWhereUniqueWithoutOwnerInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => BaseCreateManyOwnerInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => BaseWhereUniqueInputObjectSchema), z.lazy(() => BaseWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => BaseWhereUniqueInputObjectSchema), z.lazy(() => BaseWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => BaseWhereUniqueInputObjectSchema), z.lazy(() => BaseWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => BaseWhereUniqueInputObjectSchema), z.lazy(() => BaseWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => BaseUpdateWithWhereUniqueWithoutOwnerInputObjectSchema), z.lazy(() => BaseUpdateWithWhereUniqueWithoutOwnerInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => BaseUpdateManyWithWhereWithoutOwnerInputObjectSchema), z.lazy(() => BaseUpdateManyWithWhereWithoutOwnerInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => BaseScalarWhereInputObjectSchema), z.lazy(() => BaseScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const BaseUncheckedUpdateManyWithoutOwnerNestedInputObjectSchema: z.ZodType<Prisma.BaseUncheckedUpdateManyWithoutOwnerNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.BaseUncheckedUpdateManyWithoutOwnerNestedInput>;
export const BaseUncheckedUpdateManyWithoutOwnerNestedInputObjectZodSchema = makeSchema();
