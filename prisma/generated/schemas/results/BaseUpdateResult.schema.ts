import * as z from 'zod';
export const BaseUpdateResultSchema = z.nullable(z.object({
  id: z.string(),
  name: z.string(),
  color: z.string(),
  ownerId: z.string(),
  owner: z.unknown(),
  tables: z.array(z.unknown()),
  createdAt: z.date(),
  updatedAt: z.date()
}));