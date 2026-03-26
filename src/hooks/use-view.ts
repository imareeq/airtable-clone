import { useParams } from "next/navigation";
import { api } from "~/trpc/react";

export function useView() {
  const { viewId } = useParams<{ viewId: string }>();
  const { data: view } = api.view.getById.useQuery({ viewId });
  return view!;
}
