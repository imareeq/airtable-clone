import * as z from 'zod';
// prettier-ignore
export const ViewResultSchema = z.object({
    id: z.string(),
    name: z.string(),
    tableId: z.string(),
    table: z.unknown(),
    filterConfig: z.unknown(),
    sortConfig: z.unknown(),
    hiddenColumns: z.unknown(),
    searchQuery: z.string().nullable(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type ViewResultType = z.infer<typeof ViewResultSchema>;
