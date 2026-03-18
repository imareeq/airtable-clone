import * as z from 'zod';
// prettier-ignore
export const BaseResultSchema = z.object({
    id: z.string(),
    name: z.string(),
    color: z.string(),
    ownerId: z.string(),
    owner: z.unknown(),
    tables: z.array(z.unknown()),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type BaseResultType = z.infer<typeof BaseResultSchema>;
