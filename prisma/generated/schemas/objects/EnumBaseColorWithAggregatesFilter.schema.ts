import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma';
import { BaseColorSchema } from '../enums/BaseColor.schema';
import { NestedEnumBaseColorWithAggregatesFilterObjectSchema as NestedEnumBaseColorWithAggregatesFilterObjectSchema } from './NestedEnumBaseColorWithAggregatesFilter.schema';
import { NestedIntFilterObjectSchema as NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumBaseColorFilterObjectSchema as NestedEnumBaseColorFilterObjectSchema } from './NestedEnumBaseColorFilter.schema'

const makeSchema = () => z.object({
  equals: BaseColorSchema.optional(),
  in: BaseColorSchema.array().optional(),
  notIn: BaseColorSchema.array().optional(),
  not: z.union([BaseColorSchema, z.lazy(() => NestedEnumBaseColorWithAggregatesFilterObjectSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumBaseColorFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumBaseColorFilterObjectSchema).optional()
}).strict();
export const EnumBaseColorWithAggregatesFilterObjectSchema: z.ZodType<Prisma.EnumBaseColorWithAggregatesFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumBaseColorWithAggregatesFilter>;
export const EnumBaseColorWithAggregatesFilterObjectZodSchema = makeSchema();
