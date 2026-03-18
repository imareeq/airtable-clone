import * as z from 'zod';
// prettier-ignore
export const ViewModelSchema = z.object({
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

export type ViewPureType = z.infer<typeof ViewModelSchema>;
