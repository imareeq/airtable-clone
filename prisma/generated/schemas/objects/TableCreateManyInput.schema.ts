import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma';


const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string(),
  orderIndex: z.number().int().optional(),
  baseId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();
export const TableCreateManyInputObjectSchema: z.ZodType<Prisma.TableCreateManyInput> = makeSchema() as unknown as z.ZodType<Prisma.TableCreateManyInput>;
export const TableCreateManyInputObjectZodSchema = makeSchema();
