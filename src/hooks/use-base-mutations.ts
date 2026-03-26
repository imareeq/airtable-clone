import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { api } from "~/trpc/react";

export function useBaseMutations(baseId: string) {
  const utils = api.useUtils();
  const router = useRouter();

  const updateBase = api.base.update.useMutation({
    onMutate: async (input) => {
      await utils.base.getById.cancel({ baseId });
      const previous = utils.base.getById.getData({ baseId });
      utils.base.getById.setData({ baseId }, (old) =>
        old ? { ...old, ...input } : old,
      );
      return { previous };
    },
    onError: (error, _vars, context) => {
      if (context?.previous) {
        utils.base.getById.setData({ baseId }, context.previous);
      }
      toast.error(`Failed to update base: ${error.message}`);
    },
    onSettled: async () => {
      await utils.base.getById.invalidate({ baseId });
      await utils.base.getAll.invalidate();
    },
  });
  
  const deleteBase = api.base.delete.useMutation({
    onMutate: async () => {
      await utils.base.getAll.cancel();
      const previous = utils.base.getAll.getData();
      utils.base.getAll.setData(undefined, (old) =>
        old ? old.filter((b) => b.id !== baseId) : old,
      );
      return { previous };
    },
    onError: (error, _vars, context) => {
      if (context?.previous) {
        utils.base.getAll.setData(undefined, context.previous);
      }
      toast.error(`Failed to delete base: ${error.message}`);
    },
    onSuccess: () => {
      router.push("/");
    },
    onSettled: async () => {
      await utils.base.getAll.invalidate();
      await utils.base.getById.invalidate({ baseId });
    },
  });

  return { updateBase, deleteBase };
}
