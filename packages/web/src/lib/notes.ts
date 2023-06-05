import jscookies from "js-cookie";
import { LatestNote } from "../../@types/note";

export async function fetchNotesClient({
  limit = 5,
}: {
  limit?: number;
}): Promise<LatestNote[]> {
  const token = jscookies.get("token") as string;
  return fetchNotes(token, limit);
}

async function fetchNotes(token: string, limit: number) {
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
    url: `/notes/${note.id}`,
  }));

  return notes.slice(0, limit);
}
