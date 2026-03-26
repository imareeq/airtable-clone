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

    const whereClause = search
      ? `WHERE search_vector @@ to_tsquery('english', $2)`
      : "";

    const params: unknown[] = [cursor];
    if (search) params.push(`${search}:*`);

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
      data: {
        name,
      },
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
     SET search_vector = to_tsvector('english', concat_ws(' ', ${colList}))
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
      `"search_vector" tsvector`,
      ...columns.map((col) => `"${col.id}" TEXT`),
    ].join(", ");

    await db.$executeRawUnsafe(`CREATE TABLE "${tableName}" (${columnDefs})`);

    await db.$executeRawUnsafe(
      `CREATE INDEX "search_${tableId}_idx" ON "${tableName}" USING GIN("search_vector")`,
    );
  },

  async seedTableWithFakeData(
    db: DBClient,
    tableId: string,
    columns: { id: string; name: string; type: ColumnType }[],
    numRows: number = 10,
  ) {
    const tableName = `spreadsheet_${tableId}`;

    const colNames = [
      `"id", "search_vector"`,
      ...columns.map((c) => `"${c.id}"`),
    ].join(", ");

    const numCols = columns.length + 1;
    const BATCH_SIZE = Math.floor(65000 / numCols);

    for (let i = 0; i < numRows; i += BATCH_SIZE) {
      const currentBatchCount = Math.min(BATCH_SIZE, numRows - i);
      const rows = generateFakeRows(columns, currentBatchCount, i);

      const valuePlaceholders: string[] = [];
      const flattenedValues: any[] = [];

      for (const row of rows) {
        const colPlaceholders = row.values
          .map((_, i) => `$${flattenedValues.length + i + 2}`)
          .join(", ");
        const searchCols = row.values
          .map(
            (_, i) => `COALESCE($${flattenedValues.length + i + 2}::text, '')`,
          )
          .join(", ");

        valuePlaceholders.push(
          `($${flattenedValues.length + 1}, to_tsvector('english', concat_ws(' ', ${searchCols})), ${colPlaceholders})`,
        );
        flattenedValues.push(row.id, ...row.values);
      }

      const query = `INSERT INTO "${tableName}" (${colNames}) VALUES ${valuePlaceholders.join(", ")}`;

      await db.$executeRawUnsafe(query, ...flattenedValues);
    }
  },

  async getRowCount(db: DBClient, tableId: string, search?: string) {
    if (search) {
      const result = await db.$queryRawUnsafe<[{ count: bigint }]>(
        `SELECT COUNT(*) as count FROM "spreadsheet_${tableId}" WHERE search_vector @@ to_tsquery('english', $1)`,
        `${search}:*`,
      );
      return Number(result[0]?.count ?? 0);
    }

    const result = await db.$queryRawUnsafe<[{ count: bigint }]>(
      `SELECT COUNT(*) as count FROM "spreadsheet_${tableId}"`,
    );
    return Number(result[0]?.count ?? 0);
  },

  async searchRows(
    db: DBClient,
    tableId: string,
    query: string,
    columnIds: string[],
  ): Promise<{ row_number: number; columnId: string }[]> {
    const unnestArray = columnIds
      .map((id) => `CASE WHEN "${id}" ILIKE $2 THEN '${id}' END`)
      .join(", ");

    const rows = await db.$queryRawUnsafe<
      { row_number: bigint; column_id: string | null }[]
    >(
      `SELECT 
      ROW_NUMBER() OVER (ORDER BY "order_index") as row_number,
      unnest(ARRAY[${unnestArray}]) as column_id
      FROM "spreadsheet_${tableId}"
      WHERE search_vector @@ plainto_tsquery('english', $1)
      ORDER BY "order_index"`,
      query,
      `%${query}%`,
    );

    return rows
      .filter((r) => r.column_id !== null)
      .map((r) => ({
        row_number: Number(r.row_number),
        columnId: r.column_id!,
      }));
  },
};
