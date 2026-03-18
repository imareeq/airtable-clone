import * as z from 'zod';

export const ColumnScalarFieldEnumSchema = z.enum(['id', 'name', 'type', 'orderIndex', 'tableId', 'createdAt', 'updatedAt'])

export type ColumnScalarFieldEnum = z.infer<typeof ColumnScalarFieldEnumSchema>;