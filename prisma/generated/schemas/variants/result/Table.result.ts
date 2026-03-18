import * as z from 'zod';
// prettier-ignore
export const TableResultSchema = z.object({
    id: z.string(),
    name: z.string(),
    orderIndex: z.number().int(),
    baseId: z.string(),
    base: z.unknown(),
    columns: z.array(z.unknown()),
    views: z.array(z.unknown()),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type TableResultType = z.infer<typeof TableResultSchema>;
