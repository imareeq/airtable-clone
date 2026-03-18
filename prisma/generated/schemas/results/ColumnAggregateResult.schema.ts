import * as z from 'zod';
export const ColumnAggregateResultSchema = z.object({  _count: z.object({
    id: z.number(),
    name: z.number(),
    type: z.number(),
    orderIndex: z.number(),
    tableId: z.number(),
    table: z.number(),
    createdAt: z.number(),
    updatedAt: z.number()
  }).optional(),
  _sum: z.object({
    orderIndex: z.number().nullable()
  }).nullable().optional(),
  _avg: z.object({
    orderIndex: z.number().nullable()
  }).nullable().optional(),
  _min: z.object({
    id: z.string().nullable(),
    name: z.string().nullable(),
    orderIndex: z.number().int().nullable(),
    tableId: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    name: z.string().nullable(),
    orderIndex: z.number().int().nullable(),
    tableId: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional()});