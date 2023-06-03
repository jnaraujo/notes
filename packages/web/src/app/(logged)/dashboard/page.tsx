import LatestNotes from "@/components/Widgets/LatestNotes";
import QuickNoteWidget from "@/components/Widgets/QuickNoteWidget";

export default async function Dashboard() {

  return (
    <>
      <div className="space-y-1">
        <h1 className="text-lg font-extrabold text-zinc-500">
          Bem-vindo, Usuário!
        </h1>
      </div>

      <div className="flex gap-8 flex-col md:flex-row justify-between">
        <LatestNotes />
        <QuickNoteWidget />
      </div>
    </>
  )
}