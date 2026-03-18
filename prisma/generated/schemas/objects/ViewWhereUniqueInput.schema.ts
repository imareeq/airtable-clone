import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma';


const makeSchema = () => z.object({
  id: z.string().optional()
}).strict();
export const ViewWhereUniqueInputObjectSchema: z.ZodType<Prisma.ViewWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.ViewWhereUniqueInput>;
export const ViewWhereUniqueInputObjectZodSchema = makeSchema();
