import Note from "../Note";

interface Note {
  title: string;
  description: string;
  views: number;
  url: string;
}

interface LatestNotesProps {
  notes: Note[];
}

export default function LatestNotes({
  notes
}: LatestNotesProps) {
  return (
    <div className="md:w-3/5">
      <h2 className="text-xl font-bold text-zinc-500 md:text-2xl">
        Suas últimas notas:
      </h2>
      <div className="mt-2 flex flex-col gap-2">
        {
          notes.map((note, index) => (
            <Note
              key={index}
              title={note.title}
              description={note.description}
              views={note.views}
              url={note.url}
            />
          ))
        }
      </div>
    </div>
  );
}
