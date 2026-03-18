import * as z from 'zod';
export const BaseCreateResultSchema = z.object({
  id: z.string(),
  name: z.string(),
  color: z.unknown(),
  ownerId: z.string(),
  owner: z.unknown(),
  tables: z.array(z.unknown()),
  createdAt: z.date(),
  updatedAt: z.date()
});