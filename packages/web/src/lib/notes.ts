import { Note } from "@/@types/note";

export async function fetchNotes(token: string): Promise<Note[]> {
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
    createdAt: new Date(note.createdAt),
    updatedAt: new Date(note.updatedAt),
  }));

  return notes;
}

export async function createNote(
  token: string,
  title: string,
  content: string
): Promise<Note> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API}/notes`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      content,
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
    createdAt: new Date(json.createdAt),
    updatedAt: new Date(json.updatedAt),
  };
}

export async function updateNote(
  token: string,
  id: string,
  title: string,
  content: string,
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
      content,
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
    createdAt: new Date(json.createdAt),
    updatedAt: new Date(json.updatedAt),
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
    createdAt: new Date(json.createdAt),
    updatedAt: new Date(json.updatedAt),
  };

  return note;
}

export async function deleteNote(token: string, id: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API}/notes/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete note");
  }
}
