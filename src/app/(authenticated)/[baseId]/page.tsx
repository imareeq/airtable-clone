"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useBase } from "~/contexts/base-context";

export default function AppPage() {
  const router = useRouter();
  const base = useBase();

  useEffect(() => {
    if (!base.tables[0]) return;
    router.replace(`/${base.id}/${base.tables[0].id}`);
  }, [base.id]);

  return <div className="flex-1" />;
}
