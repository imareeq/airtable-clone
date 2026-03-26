"use client";

import { UsersThreeIcon, UserIcon, LockIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { CircleStar } from "lucide-react";

type ViewPermission = "collaborative" | "personal" | "locked";

const PERMISSIONS: {
  value: ViewPermission;
  label: string;
  icon: React.ReactNode;
  pro?: boolean;
}[] = [
  {
    value: "collaborative",
    label: "Collaborative",
    icon: <UsersThreeIcon className="size-4" />,
  },
  {
    value: "personal",
    label: "Personal",
    icon: <UserIcon className="size-4" />,
    pro: true,
  },
  {
    value: "locked",
    label: "Locked",
    icon: <LockIcon className="size-4" />,
    pro: true,
  },
];

interface CreateViewFormProps {
  onConfirm: (name: string) => void;
  onCancel: () => void;
  defaultName?: string;
}

export function CreateViewForm({
  onConfirm,
  onCancel,
  defaultName = "Grid View",
}: CreateViewFormProps) {
  const [name, setName] = useState(defaultName);

  return (
    <div className="space-y-7">
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="bg-background focus:outline-muted-foreground focus:ring-muted-foreground mt-2 h-[33.25px] text-[17px] font-semibold"
        autoFocus
      />

      <div className="space-y-1.5">
        <p className="text-[15px] font-semibold">Who can edit</p>
        <div className="flex items-center gap-4">
          {PERMISSIONS.map((p) => (
            <label
              key={p.value}
              className="flex cursor-pointer items-center gap-1.5"
            >
              <input
                type="radio"
                name="permission"
                value={p.value}
                className="accent-blue-500"
              />
              {p.icon}
              <span className="text-[13px]">{p.label}</span>
              {p.pro && <CircleStar className="text-primary size-4 stroke-1" />}
            </label>
          ))}
        </div>
        <p className="text-[13px] text-black/70">
          All collaborators can edit the configuration
        </p>
      </div>

      <div className="flex justify-end gap-2">
        <Button
        size="lg"
          variant="ghost"
          onClick={onCancel}
          className="text-[13px] px-3"
        >
          Cancel
        </Button>
        <Button
        size="lg"
          className="rounded-lg bg-primary px-3 text-[13px] text-white font-semibold hover:bg-blue-600"
          onClick={() => onConfirm(name)}
        >
          Create new view
        </Button>
      </div>
    </div>
  );
}
