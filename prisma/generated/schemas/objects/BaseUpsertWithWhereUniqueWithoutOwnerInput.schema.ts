import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma';
import { BaseWhereUniqueInputObjectSchema as BaseWhereUniqueInputObjectSchema } from './BaseWhereUniqueInput.schema';
import { BaseUpdateWithoutOwnerInputObjectSchema as BaseUpdateWithoutOwnerInputObjectSchema } from './BaseUpdateWithoutOwnerInput.schema';
import { BaseUncheckedUpdateWithoutOwnerInputObjectSchema as BaseUncheckedUpdateWithoutOwnerInputObjectSchema } from './BaseUncheckedUpdateWithoutOwnerInput.schema';
import { BaseCreateWithoutOwnerInputObjectSchema as BaseCreateWithoutOwnerInputObjectSchema } from './BaseCreateWithoutOwnerInput.schema';
import { BaseUncheckedCreateWithoutOwnerInputObjectSchema as BaseUncheckedCreateWithoutOwnerInputObjectSchema } from './BaseUncheckedCreateWithoutOwnerInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => BaseWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => BaseUpdateWithoutOwnerInputObjectSchema), z.lazy(() => BaseUncheckedUpdateWithoutOwnerInputObjectSchema)]),
  create: z.union([z.lazy(() => BaseCreateWithoutOwnerInputObjectSchema), z.lazy(() => BaseUncheckedCreateWithoutOwnerInputObjectSchema)])
}).strict();
export const BaseUpsertWithWhereUniqueWithoutOwnerInputObjectSchema: z.ZodType<Prisma.BaseUpsertWithWhereUniqueWithoutOwnerInput> = makeSchema() as unknown as z.ZodType<Prisma.BaseUpsertWithWhereUniqueWithoutOwnerInput>;
export const BaseUpsertWithWhereUniqueWithoutOwnerInputObjectZodSchema = makeSchema();
