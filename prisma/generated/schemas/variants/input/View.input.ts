import * as z from 'zod';
// prettier-ignore
export const ViewInputSchema = z.object({
    id: z.string(),
    name: z.string(),
    tableId: z.string(),
    table: z.unknown(),
    filterConfig: z.unknown(),
    sortConfig: z.unknown(),
    hiddenColumns: z.unknown(),
    searchQuery: z.string().optional().nullable(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type ViewInputType = z.infer<typeof ViewInputSchema>;
