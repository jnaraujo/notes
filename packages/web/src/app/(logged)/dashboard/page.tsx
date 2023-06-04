import LatestNotes from "@/components/Widgets/LatestNotes";
import QuickNoteWidget from "@/components/Widgets/QuickNoteWidget";
import { getUser } from "@/lib/auth";
import { fetchNotes } from "@/lib/notes";
import getQueryClient from "@/lib/query/getQueryClient";
import Hydrate from "@/lib/query/hydrate.client";
import { dehydrate } from "@tanstack/react-query";
import { cookies } from "next/headers";

export default async function Dashboard() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(["latest-notes"], () =>
    fetchNotes({
      limit: 5,
      token: cookies().get("token")?.value,
    })
  );
  const dehydratedState = dehydrate(queryClient);
  const user = await getUser();
  
  return (
    <>
      <div className="space-y-1">
        <h1 className="font-semibold text-zinc-600 md:text-lg">
          Bem-vindo, {user.name}!
        </h1>
      </div>

      <div className="mt-4 flex flex-col justify-between gap-8 md:flex-row">
        <Hydrate state={dehydratedState}>
          <LatestNotes />
        </Hydrate>
        <QuickNoteWidget />
      </div>
    </>
  );
}
