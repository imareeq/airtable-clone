import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { api } from "~/trpc/react";

export function useSpreadsheetMutations(tableId: string) {
  const utils = api.useUtils();
  const router = useRouter();

  const createRow = api.table.createRow.useMutation({
    onSuccess: () => {
      void utils.table.getRows.invalidate({ tableId });
    },
    onError: (error) => {
      toast.error(`Failed to create row: ${error.message}`);
    },
  });

  const deleteRow = api.table.deleteRow.useMutation({
    onMutate: async ({ rowId }) => {
      await utils.table.getRows.cancel({ tableId: tableId });

      const previousData = utils.table.getRows.getInfiniteData({
        tableId: tableId,
      });

      utils.table.getRows.setInfiniteData({ tableId: tableId }, (old) => {
        if (!old) return old;
        return {
          ...old,
          pages: old.pages.map((page) => ({
            ...page,
            totalCount: page.totalCount - 1,
            rows: page.rows.filter((row) => row.id !== rowId),
          })),
        };
      });

      return { previousData };
    },
    onError: (error, _vars, context) => {
      if (context?.previousData) {
        utils.table.getRows.setInfiniteData(
          { tableId: tableId },
          context.previousData,
        );
      }
      toast.error(`Failed to delete row: ${error.message}`);
    },
    onSettled: () => {
      void utils.table.getRows.invalidate({ tableId: tableId });
    },
  });

  const updateCell = api.table.updateCell.useMutation({
    onMutate: async ({ rowId, columnId, value }) => {
      await utils.table.getRows.cancel({ tableId: tableId });

      const previousRows = utils.table.getRows.getInfiniteData({
        tableId: tableId,
      });

      utils.table.getRows.setInfiniteData({ tableId: tableId }, (old) => {
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
        utils.table.getRows.setInfiniteData(
          { tableId: tableId },
          context.previousRows,
        );
      }
      toast.error(`Failed to update cell: ${error.message}`);
    },
    onSettled: () => {
      void utils.table.getRows.invalidate({ tableId: tableId });
    },
  });

  const createCol = api.column.create.useMutation({
    onSuccess: () => {
      void utils.table.getRows.invalidate({ tableId });
    },
    onError: (error) => {
      toast.error(`Failed to create column: ${error.message}`);
    },
  });

  const deleteCol = api.column.delete.useMutation({
    onSuccess: () => {
      void utils.table.getRows.invalidate({ tableId });
    },
    onError: (error) => {
      toast.error(`Failed to delete field: ${error.message}`);
    },
  });

  return { createRow, deleteRow, createCol, deleteCol, updateCell };
}
