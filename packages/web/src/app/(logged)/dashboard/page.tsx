import LatestNotes from "@/components/Widgets/LatestNotes";
import QuickNoteWidget from "@/components/Widgets/QuickNoteWidget";
import { getUser } from "@/lib/auth";
import { fetchNotes } from "@/lib/notes";

export default async function Dashboard() {
  const user = await getUser();
  const notes = await fetchNotes(5);

  return (
    <>
      <div className="space-y-1">
        <h1 className="font-semibold text-zinc-600 md:text-lg">
          Bem-vindo, {user.name}!
        </h1>
      </div>

      <div className="mt-4 flex flex-col justify-between gap-8 md:flex-row">
        <LatestNotes notes={notes} />
        <QuickNoteWidget />
      </div>
    </>
  );
}
