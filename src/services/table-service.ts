import type { DBClient } from "~/server/lib/db";
import { ViewService } from "./view-service";
import { ColumnService } from "./column-service";
import { DEFAULT_COLUMNS, generateFakeRows } from "~/server/lib/fake-data";
import { ColumnType } from "generated/prisma";
import { nanoid } from "nanoid";
import type { SpreadsheetRow } from "~/server/api/routers/table";

export const ROW_LIMIT = 100;

type FilterCondition = {
  columnId: string;
  operator: string;
  value: string;
  conjunction?: "and" | "or";
};

function buildFilterClauses(
  filterConfig: FilterCondition[],
  params: unknown[],
): string {
  const filterClauses = filterConfig.map((filter, i) => {
    const col = `"${filter.columnId}"`;
    let clause: string;

    switch (filter.operator) {
      case "contains":
        params.push(`%${filter.value}%`);
        clause = `${col} ILIKE $${params.length}`;
        break;
      case "not_contains":
        params.push(`%${filter.value}%`);
        clause = `${col} NOT ILIKE $${params.length}`;
        break;
      case "is_equal_to":
        params.push(filter.value);
        clause = `${col} = $${params.length}`;
        break;
      case "is_empty":
        clause = `(${col} IS NULL OR ${col} = '')`;
        break;
      case "is_not_empty":
        clause = `(${col} IS NOT NULL AND ${col} != '')`;
        break;
      case "greater_than":
        params.push(filter.value);
        clause = `${col}::numeric > $${params.length}`;
        break;
      case "less_than":
        params.push(filter.value);
        clause = `${col}::numeric < $${params.length}`;
        break;
      default:
        clause = "TRUE";
    }

    if (i === 0) return clause;
    return `${filter.conjunction === "or" ? "OR" : "AND"} ${clause}`;
  });

  return `(${filterClauses.join(" ")})`;
}

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
    table: { id: string; columns: { id: string; type: ColumnType }[] },
    columnIds: string[],
    cursor: number = 0,
    search?: string,
    sortConfig?: { columnId: string; direction: "asc" | "desc" }[],
    filterConfig?: {
      columnId: string;
      operator: string;
      value: string;
      conjunction?: "and" | "or";
    }[],
  ) {
    const cols = [
      `"id"`,
      `"order_index"`,
      ...columnIds.map((id) => `"${id}"`),
    ].join(", ");

    const params: unknown[] = [cursor];
    const whereClauses: string[] = [];

    if (search) {
      params.push(`%${search}%`);
      whereClauses.push(`"search_vector" ILIKE $${params.length}`);
    }

    const validColumnIdSet = new Set(columnIds);

    if (filterConfig && filterConfig.length > 0) {
      whereClauses.push(buildFilterClauses(filterConfig, params));
    }

    const whereClause =
      whereClauses.length > 0 ? `WHERE ${whereClauses.join(" AND ")}` : "";

    const validatedSorts = (sortConfig ?? []).filter(
      (s) =>
        validColumnIdSet.has(s.columnId) &&
        ["asc", "desc"].includes(s.direction),
    );
    
    const orderBy =
      validatedSorts.length > 0
        ? validatedSorts
            .map((s) => {
              const col = table.columns.find((c) => c.id === s.columnId);
              const colExpr =
                col?.type === ColumnType.NUMBER
                  ? `"${s.columnId}"::numeric`
                  : `"${s.columnId}"`;
              return `${colExpr} ${s.direction.toUpperCase()} NULLS LAST`;
            })
            .join(", ")
        : `"order_index" ASC`;

    return db.$queryRawUnsafe<SpreadsheetRow[]>(
      `SELECT ${cols}
   FROM "spreadsheet_${table.id}"
   ${whereClause}
   ORDER BY ${orderBy}
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

  async getRowCount(
    db: DBClient,
    tableId: string,
    search?: string,
    filterConfig?: FilterCondition[],
  ) {
    const params: unknown[] = [];
    const whereClauses: string[] = [];

    if (search) {
      params.push(`%${search}%`);
      whereClauses.push(`"search_vector" ILIKE $${params.length}`);
    }

    if (filterConfig && filterConfig.length > 0) {
      whereClauses.push(buildFilterClauses(filterConfig, params));
    }

    const whereClause =
      whereClauses.length > 0 ? `WHERE ${whereClauses.join(" AND ")}` : "";

    const result = await db.$queryRawUnsafe<[{ count: bigint }]>(
      `SELECT COUNT(*) as count FROM "spreadsheet_${tableId}" ${whereClause}`,
      ...params,
    );
    return Number(result[0]?.count ?? 0);
  },
};
