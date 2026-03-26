import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { api } from "~/trpc/react";

export function useTableMutations(baseId: string) {
  const utils = api.useUtils();
  const router = useRouter();

  const createTable = api.table.create.useMutation({
    onSuccess: async (newTable) => {
      await utils.base.getById.invalidate({ baseId });
      router.push(`/${baseId}/${newTable.id}`);
    },
    onError: (error) => {
      toast.error(`Failed to create table: ${error.message}`);
    },
  });

  const deleteTable = api.table.delete.useMutation({
    onMutate: async ({ tableId }) => {
      await utils.base.getById.cancel({ baseId });
      const previous = utils.base.getById.getData({ baseId });
      utils.base.getById.setData({ baseId }, (old) =>
        old
          ? { ...old, tables: old.tables.filter((t) => t.id !== tableId) }
          : old,
      );
      return { previous };
    },
    onError: (error, _vars, context) => {
      if (context?.previous) {
        utils.base.getById.setData({ baseId }, context.previous);
      }
      toast.error(`Failed to delete table: ${error.message}`);
    },
    onSettled: async () => {
      await utils.base.getById.invalidate({ baseId });
    },
    onSuccess: () => {
      router.push(`/${baseId}`);
    },
  });

  const updateTable = api.table.update.useMutation({
    onMutate: async ({ tableId, name }) => {
      await utils.base.getById.cancel({ baseId });
      const previous = utils.base.getById.getData({ baseId });
      utils.base.getById.setData({ baseId }, (old) =>
        old
          ? {
              ...old,
              tables: old.tables.map((t) =>
                t.id === tableId ? { ...t, name: name ?? t.name } : t,
              ),
            }
          : old,
      );
      return { previous };
    },
    onError: (error, _vars, context) => {
      if (context?.previous) {
        utils.base.getById.setData({ baseId }, context.previous);
      }
      toast.error(`Failed to update table: ${error.message}`);
    },
    onSettled: async () => {
      await utils.base.getById.invalidate({ baseId });
    },
  });

  return { createTable, deleteTable, updateTable };
}
