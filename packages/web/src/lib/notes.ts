import { cookies } from "next/headers";

export async function fetchNotes(limit: number = 10) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API}/notes`, {
    headers: {
      Authorization: `Bearer ${cookies().get("token")?.value}`,
    },
    cache: "no-cache",
  });

  const notes = (await response.json()).map((note: any) => ({
    title: note.title,
    description: note.content,
    views: note.views,
    url: `/notes/${note.id}`,
  }));

  return notes.slice(0, limit);
}
