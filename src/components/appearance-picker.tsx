"use client";

import { CheckIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { cn } from "~/lib/utils";
import { api } from "~/trpc/react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { BaseColor } from "../../generated/prisma";
import { getBaseColorClass } from "~/lib/color-utils";
import { Spinner } from "./ui/spinner";

export const COLORS = [
  { id: BaseColor.PINK_LIGHT },
  { id: BaseColor.PEACH_LIGHT },
  { id: BaseColor.YELLOW_LIGHT },
  { id: BaseColor.GREEN_LIGHT },
  { id: BaseColor.TEAL_LIGHT },
  { id: BaseColor.SKY_LIGHT },
  { id: BaseColor.BLUE_LIGHT },
  { id: BaseColor.LAVENDER_LIGHT },
  { id: BaseColor.PURPLE_LIGHT },
  { id: BaseColor.GRAY_LIGHT },
  { id: BaseColor.RED },
  { id: BaseColor.ORANGE },
  { id: BaseColor.YELLOW },
  { id: BaseColor.GREEN },
  { id: BaseColor.TEAL },
  { id: BaseColor.CYAN },
  { id: BaseColor.BLUE },
  { id: BaseColor.PINK },
  { id: BaseColor.PURPLE },
  { id: BaseColor.GRAY },
];

export default function AppearancePicker({
  baseId,
  selectedColor,
}: {
  baseId: string;
  selectedColor: BaseColor;
}) {
  const [tab, setTab] = useState<"color" | "icon">("color");
  const utils = api.useUtils();

  const updateBase = api.base.update.useMutation({
    onSuccess: async () => {
      await utils.base.getById.invalidate({ baseId });
      await utils.base.getAll.invalidate();
    },
    onError: (error) => {
      toast.error(`Failed to update color: ${error.message}`);
    },
  });

  const handleColorChange = (colorId: BaseColor) => {
    if (colorId === selectedColor) return;

    updateBase.mutate({
      baseId: baseId,
      color: colorId,
    });
  };

  return (
    <div className="w-full">
      <div className="mb-3 flex border-b">
        {(["color", "icon"] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={cn(
              "px-3 pb-2 text-sm font-medium capitalize transition-colors",
              tab === t
                ? "-mb-px border-b-2 border-blue-600 text-blue-600"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "color" && (
        <div className="grid grid-cols-10 gap-1.5">
          {COLORS.map((color) => {
            const isSelected = selectedColor === color.id;
            const isUpdating =
              updateBase.isPending && updateBase.variables?.color === color.id;
            const baseColorClass = getBaseColorClass(color.id);

            return (
              <Button
                key={color.id}
                type="button"
                disabled={updateBase.isPending}
                onClick={() => handleColorChange(color.id)}
                className={cn(
                  "relative flex h-7 w-7 items-center justify-center rounded-md transition-all focus:outline-none",
                  `${baseColorClass} hover:${baseColorClass}`,
                  updateBase.isPending && "cursor-not-allowed opacity-70",
                )}
                aria-label={color.id}
                aria-pressed={isSelected}
              >
                {isSelected && !isUpdating && (
                  <CheckIcon
                    weight="bold"
                    className="text-white drop-shadow-sm"
                    size={14}
                  />
                )}
                {isUpdating && <Spinner />}
              </Button>
            );
          })}
        </div>
      )}

      {tab === "icon" && (
        <div className="text-muted-foreground flex items-center justify-center py-6 text-sm">
          Icon picker coming soon
        </div>
      )}
    </div>
  );
}
