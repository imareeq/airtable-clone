"use client";

import { SearchForm } from "./search-form";
import AirtableIcon from "./airtable-icon";
import { api } from "~/trpc/react";
import { useState } from "react";
import BaseHeaderDropdown from "./base-header-popover";

export default function AppHeader({ baseId }: { baseId: string }) {
  const {
    data: base,
    isLoading,
    error,
  } = api.base.getById.useQuery({
    baseId: baseId,
  });

  const [selectedColor, setSelectedColor] = useState("purple");

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div className="text-destructive">{error.message}</div>;
  if (!base) return <div>404</div>;

  return (
    <header className="bg-background sticky top-0 z-50 flex w-full items-center border-b">
      <div className="flex h-(--header-height) w-full items-center justify-between gap-3.5 px-1.5">
        <div className="flex basis-1/3 flex-row items-center justify-start gap-3.5">
          <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-lg">
            <AirtableIcon variant="white" className="size-6" />
          </div>
          <BaseHeaderDropdown base={base} />
        </div>

        <SearchForm className="max-w-85 basis-1/3 self-center" />

        <div className="flex basis-1/3 flex-row items-center justify-end gap-5">
          {/* right side buttons */}
        </div>
      </div>
    </header>
  );
}
