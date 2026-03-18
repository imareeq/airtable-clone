import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma';


const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string(),
  orderIndex: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();
export const TableCreateManyBaseInputObjectSchema: z.ZodType<Prisma.TableCreateManyBaseInput> = makeSchema() as unknown as z.ZodType<Prisma.TableCreateManyBaseInput>;
export const TableCreateManyBaseInputObjectZodSchema = makeSchema();
