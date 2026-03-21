import type { DBClient } from "~/server/lib/db";
import { ViewService } from "./view-service";
import { ColumnService } from "./column-service";
import { DEFAULT_COLUMNS, generateFakeRows } from "~/server/lib/fake-data";
import { ColumnType } from "generated/prisma";
import { nanoid } from "nanoid";

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

  async getRows(db: DBClient, tableId: string, columnIds: string[]) {
    const cols = [
      `"id"`,
      `"order_index"`,
      ...columnIds.map((id) => `"${id}"`),
    ].join(", ");

    return db.$queryRawUnsafe(
      `SELECT ${cols} FROM "spreadsheet_${tableId}" ORDER BY "order_index" ASC`,
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
      `"order_index" BIGINT GENERATED ALWAYS AS IDENTITY`,
      ...columns.map((col) => `"${col.id}" TEXT`),
    ].join(", ");

    await db.$executeRawUnsafe(`CREATE TABLE "${tableName}" (${columnDefs})`);
  },

  async seedTableWithFakeData(
    db: DBClient,
    tableId: string,
    columns: { id: string; name: string; type: ColumnType }[],
  ) {
    const tableName = `spreadsheet_${tableId}`;

    const colNames = [`"id"`, ...columns.map((c) => `"${c.id}"`)].join(", ");
    const rows = generateFakeRows(columns, 10);

    for (const row of rows) {
      const values = [row.id, ...row.values];
      const placeholders = values.map((_, i) => `$${i + 1}`).join(", ");
      await db.$executeRawUnsafe(
        `INSERT INTO "${tableName}" (${colNames}) VALUES (${placeholders})`,
        ...values,
      );
    }
  },
};
