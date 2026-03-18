import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma';
import { BaseWhereUniqueInputObjectSchema as BaseWhereUniqueInputObjectSchema } from './BaseWhereUniqueInput.schema';
import { BaseUpdateWithoutOwnerInputObjectSchema as BaseUpdateWithoutOwnerInputObjectSchema } from './BaseUpdateWithoutOwnerInput.schema';
import { BaseUncheckedUpdateWithoutOwnerInputObjectSchema as BaseUncheckedUpdateWithoutOwnerInputObjectSchema } from './BaseUncheckedUpdateWithoutOwnerInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => BaseWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => BaseUpdateWithoutOwnerInputObjectSchema), z.lazy(() => BaseUncheckedUpdateWithoutOwnerInputObjectSchema)])
}).strict();
export const BaseUpdateWithWhereUniqueWithoutOwnerInputObjectSchema: z.ZodType<Prisma.BaseUpdateWithWhereUniqueWithoutOwnerInput> = makeSchema() as unknown as z.ZodType<Prisma.BaseUpdateWithWhereUniqueWithoutOwnerInput>;
export const BaseUpdateWithWhereUniqueWithoutOwnerInputObjectZodSchema = makeSchema();
