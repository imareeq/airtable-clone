import * as z from 'zod';
export const ViewFindUniqueResultSchema = z.nullable(z.object({
  id: z.string(),
  name: z.string(),
  tableId: z.string(),
  table: z.unknown(),
  filterConfig: z.unknown(),
  sortConfig: z.unknown(),
  hiddenColumns: z.unknown(),
  searchQuery: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date()
}));