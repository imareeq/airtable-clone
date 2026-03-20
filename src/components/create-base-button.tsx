"use client";

import { PlusIcon } from "@phosphor-icons/react";
import { cn } from "~/lib/utils";
import { Button } from "./ui/button";
import { useSidebar } from "./ui/sidebar";
import { api } from "~/trpc/react";
import { toast } from "sonner";
import { COLORS } from "./appearance-picker";
import { BaseColor } from "../../generated/prisma";
import { useRouter } from "next/navigation";

export default function CreateBaseButton() {
  const { state } = useSidebar();
  const utils = api.useUtils();
  const router = useRouter();

  const createBase = api.base.create.useMutation({
    onSuccess: async (newBase) => {
      await utils.base.getAll.invalidate();
      const firstTable = newBase.tables[0]!;
      const firstView = firstTable.views[0]!;
      router.push(`/${newBase.id}/${firstTable.id}/${firstView.id}`);
    },
    onError: (error) => toast.error(`Failed to create base: ${error.message}`),
  });

  const handleCreate = () => {
    const randomColor =
      COLORS[Math.floor(Math.random() * COLORS.length)]?.id ?? BaseColor.BLUE;
    createBase.mutate({ name: "Untitled Base", color: randomColor });
  };

  return (
    <Button
      onClick={handleCreate}
      disabled={createBase.isPending}
      variant={state === "collapsed" ? "outline" : "default"}
      className={cn(
        "flex flex-row items-center gap-2 text-xs font-semibold",
        state === "collapsed" ? "h-5.5! w-5.5!" : "h-9 w-full",
      )}
    >
      <PlusIcon className="size-4" />
      {state !== "collapsed" && "Create"}
    </Button>
  );
}
