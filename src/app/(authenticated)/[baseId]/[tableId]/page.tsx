"use client";
import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useTable } from "~/contexts/table-context";

export default function TableIndexPage() {
  const router = useRouter();
  const { baseId, tableId } = useParams();
  const table = useTable();

  useEffect(() => {
    if (!table.views[0]) return;
    router.replace(`/${baseId}/${tableId}/${table.views[0].id}`);
  }, [tableId]);

  return <div className="flex-1" />;
}
