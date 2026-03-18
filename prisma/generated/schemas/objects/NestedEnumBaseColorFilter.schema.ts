import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma';
import { BaseColorSchema } from '../enums/BaseColor.schema'

const nestedenumbasecolorfilterSchema = z.object({
  equals: BaseColorSchema.optional(),
  in: BaseColorSchema.array().optional(),
  notIn: BaseColorSchema.array().optional(),
  not: z.union([BaseColorSchema, z.lazy(() => NestedEnumBaseColorFilterObjectSchema)]).optional()
}).strict();
export const NestedEnumBaseColorFilterObjectSchema: z.ZodType<Prisma.NestedEnumBaseColorFilter> = nestedenumbasecolorfilterSchema as unknown as z.ZodType<Prisma.NestedEnumBaseColorFilter>;
export const NestedEnumBaseColorFilterObjectZodSchema = nestedenumbasecolorfilterSchema;
