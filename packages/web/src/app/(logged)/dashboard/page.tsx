import LatestNotes from "@/components/Widgets/LatestNotes";
import QuickNoteWidget from "@/components/Widgets/QuickNoteWidget";
import getQueryClient from "@/lib/query/getQueryClient";
import { dehydrate } from "@tanstack/react-query";
import Hydrate from "@/lib/query/hydrate.client";
import { cookies } from "next/headers"
import { getUser } from "@/lib/auth";
import { fetchNotes } from "@/lib/notes";

export default async function Dashboard() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(["latest-notes"], () =>
    fetchNotes(cookies().get("token")?.value as string, 5)
  );
  const dehydratedState = dehydrate(queryClient);
  const user = getUser();
  
  return (
    <>
      <div className="mt-4 flex flex-col justify-between gap-8 md:flex-row">
        <Hydrate state={dehydratedState}>
          <LatestNotes />
        </Hydrate>
        <QuickNoteWidget />
      </div>
    </>
  );
}
