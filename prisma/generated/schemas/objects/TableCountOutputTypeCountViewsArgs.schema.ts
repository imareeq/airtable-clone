import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma';
import { ViewWhereInputObjectSchema as ViewWhereInputObjectSchema } from './ViewWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ViewWhereInputObjectSchema).optional()
}).strict();
export const TableCountOutputTypeCountViewsArgsObjectSchema = makeSchema();
export const TableCountOutputTypeCountViewsArgsObjectZodSchema = makeSchema();
