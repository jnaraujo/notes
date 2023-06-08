import { Note } from "@/@types/note";

export async function fetchNotes(
  token: string,
  limit: number
): Promise<Note[]> {
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
    id: note.id,
    isPublic: note.isPublic,
  }));

  return notes.slice(0, limit);
}

export async function createNote(
  token: string,
  title: string,
  description: string
): Promise<Note> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API}/notes`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      content: description,
      isPublic: false,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to create note");
  }

  const json = await response.json();

  return {
    title: json.title,
    content: json.content,
    id: json.id,
    isPublic: json.isPublic,
  };
}

export async function updateNote(
  token: string,
  id: string,
  title: string,
  description: string,
  isPublic: boolean
) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API}/notes/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      content: description,
      isPublic,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to update note");
  }

  const json = await response.json();
  const note: Note = {
    title: json.title,
    content: json.content,
    id: json.id,
    isPublic: json.isPublic,
  };

  return note;
}

export async function fetchNote(token: string, id: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API}/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-cache",
  });

  const json = await response.json();

  const note: Note = {
    title: json.title,
    content: json.content,
    id: json.id,
    isPublic: json.isPublic,
  };

  return note;
}
