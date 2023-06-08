import { LatestNote } from "@/@types/note";

export async function fetchNotes(
  token: string,
  limit: number
): Promise<LatestNote[]> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API}/notes`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-cache",
  });

  const json = await response.json();

  const notes = json.map((note: any) => ({
    title: note.title,
    description: note.content,
    views: note.views,
    id: note.id,
    isPublic: note.isPublic,
  }));

  return notes.slice(0, limit);
}
