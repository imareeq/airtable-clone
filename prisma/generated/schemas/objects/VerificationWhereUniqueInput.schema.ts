import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma';


const makeSchema = () => z.object({
  id: z.string().optional()
}).strict();
export const VerificationWhereUniqueInputObjectSchema: z.ZodType<Prisma.VerificationWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.VerificationWhereUniqueInput>;
export const VerificationWhereUniqueInputObjectZodSchema = makeSchema();
