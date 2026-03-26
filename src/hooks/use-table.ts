import { useParams } from "next/navigation";
import { api } from "~/trpc/react";

export function useTable() {
  const { tableId } = useParams<{ tableId: string }>();
  const { data: table } = api.table.getById.useQuery({ tableId });
  return table!;
}
