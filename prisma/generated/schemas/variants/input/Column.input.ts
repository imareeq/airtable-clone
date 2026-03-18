import * as z from 'zod';
import { ColumnTypeSchema } from '../../enums/ColumnType.schema';
// prettier-ignore
export const ColumnInputSchema = z.object({
    id: z.string(),
    name: z.string(),
    type: ColumnTypeSchema,
    orderIndex: z.number().int(),
    tableId: z.string(),
    table: z.unknown(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type ColumnInputType = z.infer<typeof ColumnInputSchema>;
