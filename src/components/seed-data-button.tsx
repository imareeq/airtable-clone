import { MagicWandIcon, PlusIcon } from "@phosphor-icons/react";
import { toast } from "sonner";
import { api } from "~/trpc/react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

export default function SeedDataButton({ tableId }: { tableId: string }) {
  const utils = api.useUtils();

  const seedData = api.table.seedWithFakeData.useMutation({
    onSuccess: async () => {
      await utils.table.getRows.invalidate({ tableId });
    },
    onError: (error) => {
      toast.error(`Failed to seed data: ${error.message}`);
    },
  });

  return (
    <Button
      variant="outline"
      className="bg-background hover:bg-muted absolute bottom-5 left-2.5 z-100 gap-1.5 rounded-full px-2"
      onClick={() => seedData.mutate({ tableId, numRows: 100_000 })}
      disabled={seedData.isPending}
    >
      <PlusIcon className="size-4" />
      <Separator orientation="vertical" />
      <MagicWandIcon className="size-4" />
      {seedData.isPending ? "Adding..." : "Add 100k rows"}
    </Button>
  );
}
