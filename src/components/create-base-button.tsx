"use client";

import { PlusIcon } from "@phosphor-icons/react";
import { cn } from "~/lib/utils";
import { Button } from "./ui/button";
import { useSidebar } from "./ui/sidebar";
import { api } from "~/trpc/react";
import { toast } from "sonner";

export default function CreateBaseButton() {
  const { state } = useSidebar();
  const utils = api.useUtils();

  const createBase = api.base.create.useMutation({
    onSuccess: async (newBase) => {
      await utils.base.getAll.invalidate();
      // router.push(`/base/${newBase.id}`);
    },
    onError: (error) => toast.error(`Failed to create base: ${error.message}`),
  });

  const handleCreate = () => {
    createBase.mutate({ name: "Untitled Base" });
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
      <PlusIcon
        className={cn("size-4", createBase.isPending && "animate-spin")}
      />
      {state !== "collapsed" &&
        (createBase.isPending ? "Creating..." : "Create")}
    </Button>
  );
}
