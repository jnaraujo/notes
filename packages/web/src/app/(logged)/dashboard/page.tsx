import LatestNotes from "@/components/Widgets/LatestNotes";
import getQueryClient from "@/lib/query/getQueryClient";
import { dehydrate } from "@tanstack/react-query";
import Hydrate from "@/lib/query/hydrate.client";
import { cookies } from "next/headers";
import { fetchNotes } from "@/lib/notes";

export default async function Dashboard() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(["latest-notes"], () =>
    fetchNotes(cookies().get("token")?.value as string, 5)
  );
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <LatestNotes />
    </Hydrate>
  );
}
