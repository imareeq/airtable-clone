import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma';
import { BaseCreateManyOwnerInputObjectSchema as BaseCreateManyOwnerInputObjectSchema } from './BaseCreateManyOwnerInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => BaseCreateManyOwnerInputObjectSchema), z.lazy(() => BaseCreateManyOwnerInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const BaseCreateManyOwnerInputEnvelopeObjectSchema: z.ZodType<Prisma.BaseCreateManyOwnerInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.BaseCreateManyOwnerInputEnvelope>;
export const BaseCreateManyOwnerInputEnvelopeObjectZodSchema = makeSchema();
