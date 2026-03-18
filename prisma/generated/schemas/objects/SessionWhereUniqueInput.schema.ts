import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma';


const makeSchema = () => z.object({
  id: z.string().optional(),
  token: z.string().optional()
}).strict();
export const SessionWhereUniqueInputObjectSchema: z.ZodType<Prisma.SessionWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.SessionWhereUniqueInput>;
export const SessionWhereUniqueInputObjectZodSchema = makeSchema();
