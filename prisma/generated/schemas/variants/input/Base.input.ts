import * as z from 'zod';
// prettier-ignore
export const BaseInputSchema = z.object({
    id: z.string(),
    name: z.string(),
    color: z.string(),
    ownerId: z.string(),
    owner: z.unknown(),
    tables: z.array(z.unknown()),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type BaseInputType = z.infer<typeof BaseInputSchema>;
