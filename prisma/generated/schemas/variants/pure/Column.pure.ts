import * as z from 'zod';
import { ColumnTypeSchema } from '../../enums/ColumnType.schema';
// prettier-ignore
export const ColumnModelSchema = z.object({
    id: z.string(),
    name: z.string(),
    type: ColumnTypeSchema,
    orderIndex: z.number().int(),
    tableId: z.string(),
    table: z.unknown(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type ColumnPureType = z.infer<typeof ColumnModelSchema>;
