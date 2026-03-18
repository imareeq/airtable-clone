import * as z from 'zod';
export const ColumnDeleteResultSchema = z.nullable(z.object({
  id: z.string(),
  name: z.string(),
  type: z.unknown(),
  orderIndex: z.number().int(),
  tableId: z.string(),
  table: z.unknown(),
  createdAt: z.date(),
  updatedAt: z.date()
}));