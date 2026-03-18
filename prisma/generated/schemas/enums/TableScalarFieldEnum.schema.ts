import * as z from 'zod';

export const TableScalarFieldEnumSchema = z.enum(['id', 'name', 'orderIndex', 'baseId', 'createdAt', 'updatedAt'])

export type TableScalarFieldEnum = z.infer<typeof TableScalarFieldEnumSchema>;