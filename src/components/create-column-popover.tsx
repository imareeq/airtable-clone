"use client";

import { useState } from "react";
import {
  PlusIcon,
  TextAaIcon,
  RobotIcon,
  InfoIcon,
} from "@phosphor-icons/react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Separator } from "~/components/ui/separator";
import { ColumnType } from "generated/prisma";
import { useTable } from "~/contexts/table-context";
import { api } from "~/trpc/react";
import { useRouter, useParams } from "next/navigation";
import { toast } from "sonner";

export function CreateColumnPopover() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [type, setType] = useState<ColumnType>(ColumnType.TEXT);

  const table = useTable();
  const router = useRouter();
  const utils = api.useUtils();
  const { tableId } = useParams<{ tableId: string }>();

  const createCol = api.column.create.useMutation({
    onSuccess: () => {
      router.refresh();
      void utils.table.getRows.invalidate({ tableId });
    },
    onError: (error) => {
      toast.error(`Failed to create column: ${error.message}`);
    },
  });

  const handleCreate = () => {
    createCol.mutate({
      tableId: table.id,
      name: name || "Label",
      type,
    });
    setOpen(false);
    setName("");
    setType(ColumnType.TEXT);
  };

  const handleCancel = () => {
    setOpen(false);
    setName("");
    setType(ColumnType.TEXT);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          size="lg"
          variant="outline"
          className="bg-background hover:bg-muted absolute top-0 left-full h-[32.5px] w-23.25 rounded-none border-t-0 border-r border-l-0 leading-none"
        >
          <PlusIcon className="size-4" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="h-75 w-100 p-0 px-4 py-2" align="start">
        <div className="flex w-full flex-col gap-3">
          <Input
            autoFocus
            placeholder="Field name (optional)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleCreate();
              if (e.key === "Escape") handleCancel();
            }}
            className="h-8 text-[13px]"
          />

          <Select value={type} onValueChange={(v) => setType(v as ColumnType)}>
            <SelectTrigger size="lg" className="h-8 w-full text-[13px]">
              <div className="flex items-center gap-2">
                <SelectValue />
              </div>
            </SelectTrigger>
            <SelectContent className="w-full">
              <SelectItem value={ColumnType.TEXT}>
                <div className="flex items-center gap-2 text-[13px]">
                  <TextAaIcon className="size-4" />
                  Single line text
                </div>
              </SelectItem>
              <SelectItem value={ColumnType.NUMBER}>
                <div className="flex items-center gap-2 text-[13px]">
                  <span className="text-sm font-medium">#</span>
                  Number
                </div>
              </SelectItem>
            </SelectContent>
          </Select>

          <p className="text-muted-foreground text-[12px]">
            Enter text, or prefill each new cell with a default value.
          </p>

          <div className="flex flex-col gap-1.5">
            <Label className="text-[12px] text-black/50">Default</Label>
            <Input
              placeholder="Enter default value (optional)"
              className="h-8 text-[13px]"
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            className="hover:text-foreground flex items-center gap-1.5 text-[13px]"
          >
            <PlusIcon className="size-4" />
            Add description
          </Button>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCancel}
              className="h-8 rounded-lg px-3 text-[13px]"
            >
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={handleCreate}
              disabled={createCol.isPending}
              className="h-8 rounded-lg px-3 text-[13px]"
            >
              {createCol.isPending ? "Creating..." : "Create"}
            </Button>
          </div>
        </div>

        <div className="bg-muted flex w-full items-center justify-between rounded-lg p-2">
          <div className="flex items-center gap-2">
            <RobotIcon className="size-5 text-red-500" />
            <span className="text-[12px] text-black/75">
              Automate this field with an agent
            </span>
            <InfoIcon className="text-muted-foreground size-3.5" />
          </div>
          <Button
            variant="outline"
            size="xs"
            className="bg-background h-6 rounded-lg text-[11px] font-thin"
          >
            Convert
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
