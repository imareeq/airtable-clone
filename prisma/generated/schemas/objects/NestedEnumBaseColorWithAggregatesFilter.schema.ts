import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma';
import { BaseColorSchema } from '../enums/BaseColor.schema';
import { NestedIntFilterObjectSchema as NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumBaseColorFilterObjectSchema as NestedEnumBaseColorFilterObjectSchema } from './NestedEnumBaseColorFilter.schema'

const nestedenumbasecolorwithaggregatesfilterSchema = z.object({
  equals: BaseColorSchema.optional(),
  in: BaseColorSchema.array().optional(),
  notIn: BaseColorSchema.array().optional(),
  not: z.union([BaseColorSchema, z.lazy(() => NestedEnumBaseColorWithAggregatesFilterObjectSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumBaseColorFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumBaseColorFilterObjectSchema).optional()
}).strict();
export const NestedEnumBaseColorWithAggregatesFilterObjectSchema: z.ZodType<Prisma.NestedEnumBaseColorWithAggregatesFilter> = nestedenumbasecolorwithaggregatesfilterSchema as unknown as z.ZodType<Prisma.NestedEnumBaseColorWithAggregatesFilter>;
export const NestedEnumBaseColorWithAggregatesFilterObjectZodSchema = nestedenumbasecolorwithaggregatesfilterSchema;
