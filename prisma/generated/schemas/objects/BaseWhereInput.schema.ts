import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { EnumBaseColorFilterObjectSchema as EnumBaseColorFilterObjectSchema } from './EnumBaseColorFilter.schema';
import { BaseColorSchema } from '../enums/BaseColor.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { UserScalarRelationFilterObjectSchema as UserScalarRelationFilterObjectSchema } from './UserScalarRelationFilter.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { TableListRelationFilterObjectSchema as TableListRelationFilterObjectSchema } from './TableListRelationFilter.schema'

const basewhereinputSchema = z.object({
  AND: z.union([z.lazy(() => BaseWhereInputObjectSchema), z.lazy(() => BaseWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => BaseWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => BaseWhereInputObjectSchema), z.lazy(() => BaseWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  name: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  color: z.union([z.lazy(() => EnumBaseColorFilterObjectSchema), BaseColorSchema]).optional(),
  ownerId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  owner: z.union([z.lazy(() => UserScalarRelationFilterObjectSchema), z.lazy(() => UserWhereInputObjectSchema)]).optional(),
  tables: z.lazy(() => TableListRelationFilterObjectSchema).optional()
}).strict();
export const BaseWhereInputObjectSchema: z.ZodType<Prisma.BaseWhereInput> = basewhereinputSchema as unknown as z.ZodType<Prisma.BaseWhereInput>;
export const BaseWhereInputObjectZodSchema = basewhereinputSchema;
