import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma';
import { BaseScalarWhereInputObjectSchema as BaseScalarWhereInputObjectSchema } from './BaseScalarWhereInput.schema';
import { BaseUpdateManyMutationInputObjectSchema as BaseUpdateManyMutationInputObjectSchema } from './BaseUpdateManyMutationInput.schema';
import { BaseUncheckedUpdateManyWithoutOwnerInputObjectSchema as BaseUncheckedUpdateManyWithoutOwnerInputObjectSchema } from './BaseUncheckedUpdateManyWithoutOwnerInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => BaseScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => BaseUpdateManyMutationInputObjectSchema), z.lazy(() => BaseUncheckedUpdateManyWithoutOwnerInputObjectSchema)])
}).strict();
export const BaseUpdateManyWithWhereWithoutOwnerInputObjectSchema: z.ZodType<Prisma.BaseUpdateManyWithWhereWithoutOwnerInput> = makeSchema() as unknown as z.ZodType<Prisma.BaseUpdateManyWithWhereWithoutOwnerInput>;
export const BaseUpdateManyWithWhereWithoutOwnerInputObjectZodSchema = makeSchema();
