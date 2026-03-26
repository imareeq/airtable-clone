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
    onSuccess: async () => {
      await utils.view.getById.invalidate();
      router.refresh();
    },
    onError: (error) => {
      toast.error(`Failed to rename view: ${error.message}`);
    },
  });

  return { createView, deleteView, updateView };
}
