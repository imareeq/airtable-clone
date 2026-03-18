import * as z from 'zod';

export const ViewScalarFieldEnumSchema = z.enum(['id', 'name', 'tableId', 'filterConfig', 'sortConfig', 'hiddenColumns', 'searchQuery', 'createdAt', 'updatedAt'])

export type ViewScalarFieldEnum = z.infer<typeof ViewScalarFieldEnumSchema>;