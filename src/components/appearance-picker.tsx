"use client";

import { CheckIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { cn } from "~/lib/utils";
import { api } from "~/trpc/react";
import { toast } from "sonner";
import { Button } from "./ui/button";

const COLORS = [
  { id: "pink-light", hex: "#fbc8d4" },
  { id: "peach-light", hex: "#fcd3b0" },
  { id: "yellow-light", hex: "#fde9a2" },
  { id: "green-light", hex: "#c6eacc" },
  { id: "teal-light", hex: "#b2e5e0" },
  { id: "sky-light", hex: "#bde4f9" },
  { id: "blue-light", hex: "#bdd5f8" },
  { id: "purple-light", hex: "#d5c8f5" },
  { id: "lavender-light", hex: "#e8c8f0" },
  { id: "gray-light", hex: "#e0e0e0" },
  { id: "red", hex: "#f03e3e" },
  { id: "orange", hex: "#f76707" },
  { id: "yellow", hex: "#f59f00" },
  { id: "green", hex: "#2f9e44" },
  { id: "teal", hex: "#0c8599" },
  { id: "cyan", hex: "#1098ad" },
  { id: "blue", hex: "#1971c2" },
  { id: "pink", hex: "#c2255c" },
  { id: "purple", hex: "#6741d9" },
  { id: "gray", hex: "#495057" },
];

export default function AppearancePicker({
  baseId,
  selectedColor,
}: {
  baseId: string;
  selectedColor: string;
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

  const handleColorChange = (colorId: string) => {
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
                  `bg-[${color.hex}]`,
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
