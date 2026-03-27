import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { api } from "~/trpc/react";

export function useSpreadsheetMutations(tableId: string, search?: string) {
  const utils = api.useUtils();
  const queryKey = { tableId, search: search || undefined };

  const deleteRow = api.table.deleteRow.useMutation({
    onMutate: async ({ rowId }) => {
      await utils.table.getRows.cancel(queryKey);
      const previousData = utils.table.getRows.getInfiniteData(queryKey);

      utils.table.getRows.setInfiniteData(queryKey, (old) => {
        if (!old) return old;

        let deletedRowNumber = -1;
        old.pages.forEach((page) => {
          const found = page.rows.find((r) => r.id === rowId);
          if (found) deletedRowNumber = found.row_number;
        });

        if (deletedRowNumber === -1) return old;

        return {
          ...old,
          pages: old.pages.map((page) => ({
            ...page,
            totalCount: Math.max(0, page.totalCount - 1),
            rows: page.rows
              .filter((row) => row.id !== rowId)
              .map((row) => {
                if (row.row_number > deletedRowNumber) {
                  return { ...row, row_number: row.row_number - 1 };
                }
                return row;
              }),
          })),
        };
      });
      return { previousData };
    },
    onError: (error, _vars, context) => {
      if (context?.previousData) {
        utils.table.getRows.setInfiniteData(queryKey, context.previousData);
      }
      toast.error(`Failed to delete row: ${error.message}`);
    },
    onSettled: () => {
      void utils.table.getRows.invalidate(queryKey);
    },
  });

  const updateCell = api.table.updateCell.useMutation({
    onMutate: async ({ rowId, columnId, value }) => {
      await utils.table.getRows.cancel(queryKey);
      const previousRows = utils.table.getRows.getInfiniteData(queryKey);
      utils.table.getRows.setInfiniteData(queryKey, (old) => {
        if (!old) return old;
        return {
          ...old,
          pages: old.pages.map((page) => ({
            ...page,
            rows: page.rows.map((row) =>
              row.id === rowId ? { ...row, [columnId]: value } : row,
            ),
          })),
        };
      });
      return { previousRows };
    },
    onError: (error, _vars, context) => {
      if (context?.previousRows) {
        utils.table.getRows.setInfiniteData(queryKey, context.previousRows);
      }
      toast.error(`Failed to update cell: ${error.message}`);
    },
    onSettled: () => {
      void utils.table.getRows.invalidate(queryKey);
    },
  });

  const createRow = api.table.createRow.useMutation({
    onSuccess: () => {
      void utils.table.getRows.invalidate(queryKey);
    },
    onError: (error) => {
      toast.error(`Failed to create row: ${error.message}`);
    },
  });

  const createCol = api.column.create.useMutation({
    onSuccess: () => {
      void utils.table.getById.invalidate({ tableId });
      void utils.table.getRows.invalidate(queryKey);
    },
    onError: (error) => {
      toast.error(`Failed to create column: ${error.message}`);
    },
  });

  const deleteCol = api.column.delete.useMutation({
    onMutate: async ({ columnId }) => {
      await utils.table.getById.cancel({ tableId });
      await utils.table.getRows.cancel(queryKey);
      const previousTable = utils.table.getById.getData({ tableId });
      const previousRows = utils.table.getRows.getInfiniteData(queryKey);
      utils.table.getById.setData({ tableId }, (old) =>
        old
          ? { ...old, columns: old.columns.filter((c) => c.id !== columnId) }
          : old,
      );
      utils.table.getRows.setInfiniteData(queryKey, (old) => {
        if (!old) return old;
        return {
          ...old,
          pages: old.pages.map((page) => ({
            ...page,
            rows: page.rows.map((row) => {
              const { [columnId]: _, ...rest } = row as Record<string, unknown>;
              return rest as typeof row;
            }),
          })),
        };
      });
      return { previousTable, previousRows };
    },
    onError: (error, _vars, context) => {
      if (context?.previousTable) {
        utils.table.getById.setData({ tableId }, context.previousTable);
      }
      if (context?.previousRows) {
        utils.table.getRows.setInfiniteData(queryKey, context.previousRows);
      }
      toast.error(`Failed to delete field: ${error.message}`);
    },
    onSettled: () => {
      void utils.table.getById.invalidate({ tableId });
      void utils.table.getRows.invalidate(queryKey);
    },
  });

  return { createRow, deleteRow, createCol, deleteCol, updateCell };
}
