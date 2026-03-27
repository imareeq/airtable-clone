import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { api } from "~/trpc/react";

export function useViewMutations(baseId: string, tableId: string) {
  const utils = api.useUtils();
  const router = useRouter();

  const createView = api.view.create.useMutation({
    onSuccess: async (newView) => {
      await utils.table.getById.invalidate({ tableId });
      router.push(`/${baseId}/${tableId}/${newView.id}`);
    },
    onError: (error) => {
      toast.error(`Failed to create view: ${error.message}`);
    },
  });

  const deleteView = api.view.delete.useMutation({
    onMutate: async ({ viewId }) => {
      await utils.table.getById.cancel({ tableId });
      const previous = utils.table.getById.getData({ tableId });
      utils.table.getById.setData({ tableId }, (old) =>
        old ? { ...old, views: old.views.filter((v) => v.id !== viewId) } : old,
      );
      return { previous };
    },
    onError: (error, _vars, context) => {
      if (context?.previous) {
        utils.table.getById.setData({ tableId }, context.previous);
      }
      toast.error(`Failed to delete view: ${error.message}`);
    },
    onSettled: async () => {
      await utils.table.getById.invalidate({ tableId });
      await utils.view.getById.invalidate();
    },
    onSuccess: () => {
      router.push(`/${baseId}/${tableId}`);
    },
  });

  const updateView = api.view.update.useMutation({
    onMutate: async (input) => {
      await utils.view.getById.cancel({ viewId: input.viewId });
      await utils.table.getById.cancel({ tableId });

      const previousView = utils.view.getById.getData({ viewId: input.viewId });
      const previousTable = utils.table.getById.getData({ tableId });

      utils.view.getById.setData({ viewId: input.viewId }, (old) =>
        old ? { ...old, ...input } : old,
      );
      utils.table.getById.setData({ tableId }, (old) =>
        old
          ? {
              ...old,
              views: old.views.map((v) =>
                v.id === input.viewId ? { ...v, ...input } : v,
              ),
            }
          : old,
      );

      return { previousView, previousTable };
    },
    onError: (error, input, context) => {
      if (context?.previousView) {
        utils.view.getById.setData(
          { viewId: input.viewId },
          context.previousView,
        );
      }
      if (context?.previousTable) {
        utils.table.getById.setData({ tableId }, context.previousTable);
      }
      toast.error(`Failed to update view: ${error.message}`);
    },
    onSettled: async (_data, _error, input) => {
      await utils.view.getById.invalidate({ viewId: input.viewId });
      await utils.table.getById.invalidate({ tableId });
    },
  });

  return { createView, deleteView, updateView };
}
