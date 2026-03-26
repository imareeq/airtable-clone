import { useParams } from "next/navigation";
import { api } from "~/trpc/react";

export function useBase() {
  const { baseId } = useParams<{ baseId: string }>();
  const { data: base } = api.base.getById.useQuery({ baseId });
  return base!;
}
