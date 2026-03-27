import type { DBClient } from "~/server/lib/db";
import { ViewService } from "./view-service";
import { ColumnService } from "./column-service";
import { DEFAULT_COLUMNS, generateFakeRows } from "~/server/lib/fake-data";
import { ColumnType } from "generated/prisma";
import { nanoid } from "nanoid";
import type { SpreadsheetRow } from "~/server/api/routers/table";

export const ROW_LIMIT = 100;

export const TableService = {
  async create(db: DBClient, baseId: string, name: string) {
    const table = await db.table.create({
      data: {
        name,
        baseId,
      },
    });

    await ViewService.create(db, table.id, "Grid View");

    const columns = await ColumnService.createMany(
      db,
      table.id,
      DEFAULT_COLUMNS,
    );

    await TableService.createSpreadsheet(db, table.id, columns);
    await TableService.seedTableWithFakeData(db, table.id, columns);

    return table;
  },

  async getRows(
    db: DBClient,
    tableId: string,
    columnIds: string[],
    cursor: number = 0,
    search?: string,
  ) {
    const cols = [
      `"id"`,
      `"order_index"`,
      ...columnIds.map((id) => `"${id}"`),
    ].join(", ");

    const whereClause = search ? `WHERE "search_vector" ILIKE $2` : "";
    const params: unknown[] = [cursor];
    if (search) params.push(`%${search}%`);

    return db.$queryRawUnsafe<SpreadsheetRow[]>(
      `SELECT ${cols}
       FROM "spreadsheet_${tableId}"
       ${whereClause}
       ORDER BY "order_index" ASC
       LIMIT ${ROW_LIMIT}
       OFFSET $1`,
      ...params,
    );
  },

  async createRow(db: DBClient, tableId: string) {
    const id = nanoid(17);
    await db.$executeRawUnsafe(
      `INSERT INTO "spreadsheet_${tableId}" ("id") VALUES ($1)`,
      id,
    );
    return { id };
  },

  async deleteRow(db: DBClient, tableId: string, rowId: string) {
    await db.$executeRawUnsafe(
      `DELETE FROM "spreadsheet_${tableId}" WHERE "id" = $1`,
      rowId,
    );
  },

  async update(db: DBClient, tableId: string, name?: string) {
    return db.table.update({
      where: { id: tableId },
      data: { name },
    });
  },

  async updateCell(
    db: DBClient,
    tableId: string,
    rowId: string,
    columnId: string,
    value: string,
  ) {
    await db.$executeRawUnsafe(
      `UPDATE "spreadsheet_${tableId}" SET "${columnId}" = $1 WHERE "id" = $2`,
      value,
      rowId,
    );
  },

  async updateSearchVector(
    db: DBClient,
    tableId: string,
    rowId: string,
    columnIds: string[],
  ) {
    const colList = columnIds.map((id) => `"${id}"`).join(", ");
    await db.$executeRawUnsafe(
      `UPDATE "spreadsheet_${tableId}"
       SET search_vector = concat_ws(' ', ${colList})
       WHERE "id" = $1`,
      rowId,
    );
  },

  async delete(db: DBClient, tableId: string) {
    await db.$executeRawUnsafe(`DROP TABLE IF EXISTS "spreadsheet_${tableId}"`);
    return db.table.delete({
      where: { id: tableId },
    });
  },

  async createSpreadsheet(
    db: DBClient,
    tableId: string,
    columns: { id: string; type: ColumnType }[],
  ) {
    const tableName = `spreadsheet_${tableId}`;

    const columnDefs = [
      `"id" TEXT PRIMARY KEY`,
      `"order_index" INT GENERATED ALWAYS AS IDENTITY`,
      `"search_vector" TEXT`,
      ...columns.map((col) => `"${col.id}" TEXT`),
    ].join(", ");

    await db.$executeRawUnsafe(`CREATE EXTENSION IF NOT EXISTS pg_trgm`);
    await db.$executeRawUnsafe(`CREATE TABLE "${tableName}" (${columnDefs})`);
    await db.$executeRawUnsafe(
      `CREATE INDEX "search_${tableId}_idx" ON "${tableName}" USING GIN("search_vector" gin_trgm_ops)`,
    );
  },

  async seedTableWithFakeData(
    db: DBClient,
    tableId: string,
    columns: { id: string; name: string; type: ColumnType }[],
    numRows: number = 10,
  ) {
    const tableName = `spreadsheet_${tableId}`;
    const colNames = [`"id"`, ...columns.map((c) => `"${c.id}"`)].join(", ");

    const numCols = columns.length + 1;
    const BATCH_SIZE = Math.floor(65000 / numCols);

    for (let i = 0; i < numRows; i += BATCH_SIZE) {
      const currentBatchCount = Math.min(BATCH_SIZE, numRows - i);
      const rows = generateFakeRows(columns, currentBatchCount, i);

      const valuePlaceholders: string[] = [];
      const flattenedValues: any[] = [];
      let placeholderIndex = 1;

      for (const row of rows) {
        const rowPlaceholders: string[] = [];

        flattenedValues.push(row.id);
        rowPlaceholders.push(`$${placeholderIndex++}`);

        for (const val of row.values) {
          flattenedValues.push(val);
          rowPlaceholders.push(`$${placeholderIndex++}`);
        }

        valuePlaceholders.push(`(${rowPlaceholders.join(", ")})`);
      }

      const query = `INSERT INTO "${tableName}" (${colNames}) VALUES ${valuePlaceholders.join(", ")}`;

      if (flattenedValues.length > 0) {
        await db.$executeRawUnsafe(query, ...flattenedValues);
      }
    }

    const colList = columns.map((c) => `"${c.id}"`).join(", ");
    await db.$executeRawUnsafe(
      `UPDATE "${tableName}" SET search_vector = concat_ws(' ', ${colList})`,
    );
  },

  async getRowCount(db: DBClient, tableId: string, search?: string) {
    if (search) {
      const result = await db.$queryRawUnsafe<[{ count: bigint }]>(
        `SELECT COUNT(*) as count FROM "spreadsheet_${tableId}" WHERE "search_vector" ILIKE $1`,
        `%${search}%`,
      );
      return Number(result[0]?.count ?? 0);
    }

    const result = await db.$queryRawUnsafe<[{ count: bigint }]>(
      `SELECT COUNT(*) as count FROM "spreadsheet_${tableId}"`,
    );
    return Number(result[0]?.count ?? 0);
  },
};
