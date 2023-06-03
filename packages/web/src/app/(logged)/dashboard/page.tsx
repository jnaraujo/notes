import LatestNotes from "@/components/Widgets/LatestNotes";
import QuickNoteWidget from "@/components/Widgets/QuickNoteWidget";

export default async function Dashboard() {
  return (
    <>
      <div className="space-y-1">
        <h1 className="font-semibold text-zinc-600 md:text-lg">
          Bem-vindo, Usuário!
        </h1>
      </div>

      <div className="mt-4 flex flex-col justify-between gap-8 md:flex-row">
        <LatestNotes />
        <QuickNoteWidget />
      </div>
    </>
  );
}
