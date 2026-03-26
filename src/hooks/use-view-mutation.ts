import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { api } from "~/trpc/react";

export function useViewMutations(baseId: string, tableId: string) {
  const utils = api.useUtils();
  const router = useRouter();

  const createView = api.view.create.useMutation({
    onSuccess: async (newView) => {
      await utils.view.getById.invalidate();
      router.push(`/${baseId}/${tableId}/${newView.id}`);
      router.refresh();
    },
    onError: (error) => {
      toast.error(`Failed to create view: ${error.message}`);
    },
  });

  const deleteView = api.view.delete.useMutation({
    onSuccess: async () => {
      await utils.view.getById.invalidate();
      router.refresh();
    },
    onError: (error) => {
      toast.error(`Failed to delete view: ${error.message}`);
    },
  });

  const updateView = api.view.update.useMutation({
    onMutate: async (input) => {
      await utils.view.getById.cancel({ viewId: input.viewId });
      const previous = utils.view.getById.getData({ viewId: input.viewId });
      utils.view.getById.setData({ viewId: input.viewId }, (old) =>
        old ? { ...old, ...input } : old,
      );
      return { previous };
    },
    onError: (error, input, context) => {
      if (context?.previous) {
        utils.view.getById.setData({ viewId: input.viewId }, context.previous);
      }
      toast.error(`Failed to update view: ${error.message}`);
    },
    onSettled: async (_data, _error, input) => {
      await utils.view.getById.invalidate({ viewId: input.viewId });
    },
  });

  return { createView, deleteView, updateView };
}
