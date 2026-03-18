"use client";

import { CheckIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { cn } from "~/lib/utils";
import { api } from "~/trpc/react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { BaseColor } from "../../generated/prisma";
import { getBaseColorClass } from "~/lib/color-utils";

export const COLORS = [
  { id: BaseColor.PINK_LIGHT, hex: "#fbc8d4" },
  { id: BaseColor.PEACH_LIGHT, hex: "#fcd3b0" },
  { id: BaseColor.YELLOW_LIGHT, hex: "#fde9a2" },
  { id: BaseColor.GREEN_LIGHT, hex: "#c6eacc" },
  { id: BaseColor.TEAL_LIGHT, hex: "#b2e5e0" },
  { id: BaseColor.SKY_LIGHT, hex: "#bde4f9" },
  { id: BaseColor.BLUE_LIGHT, hex: "#bdd5f8" },
  { id: BaseColor.PURPLE_LIGHT, hex: "#d5c8f5" },
  { id: BaseColor.LAVENDER_LIGHT, hex: "#e8c8f0" },
  { id: BaseColor.GRAY_LIGHT, hex: "#e0e0e0" },
  { id: BaseColor.RED, hex: "#f03e3e" },
  { id: BaseColor.ORANGE, hex: "#f76707" },
  { id: BaseColor.YELLOW, hex: "#f59f00" },
  { id: BaseColor.GREEN, hex: "#2f9e44" },
  { id: BaseColor.TEAL, hex: "#0c8599" },
  { id: BaseColor.CYAN, hex: "#1098ad" },
  { id: BaseColor.BLUE, hex: "#1971c2" },
  { id: BaseColor.PINK, hex: "#c2255c" },
  { id: BaseColor.PURPLE, hex: "#6741d9" },
  { id: BaseColor.GRAY, hex: "#495057" },
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

            return (
              <Button
                key={color.id}
                type="button"
                disabled={updateBase.isPending}
                onClick={() => handleColorChange(color.id)}
                className={cn(
                  "relative flex h-7 w-7 items-center justify-center rounded-md transition-all hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
                  getBaseColorClass(color.id),
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
                {isUpdating && (
                  <div className="h-3 w-3 animate-spin rounded-full border-2 border-white border-t-transparent" />
                )}
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
