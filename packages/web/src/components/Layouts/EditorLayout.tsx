"use client";

import { Note } from "@/@types/note";
import Editor from "../Editor";
import { useCallback, useEffect, useState } from "react";
import { updateNote } from "@/lib/notes";
import Cookies from "js-cookie";
import Button from "../ui/Button";
import { longDateFormat } from "@/helpers/date";

interface Props {
  note: Note;
}

export default function EditorLayout({ note: initialNote }: Props) {
  const [note, setNote] = useState(initialNote);
  const [hasChanged, setHasChanged] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);

  const handleEditorUpdate = useCallback((html: string) => {
    setContent(html);
  }, []);

  function handleUpdateTitle(content: string) {
    setTitle(content);
  }

  const handleSave = useCallback(() => {
    setIsSaving(true);
    updateNote(
      Cookies.get("token") as string,
      note.id,
      title,
      content,
      false
    ).then((note) => {
      setHasChanged(false);
      setIsSaving(false);
      setNote(note);
    });
  }, [content, note.id, title]);

  useEffect(() => {
    function handle(event: KeyboardEvent) {
      if (event.code === "KeyS" && event.ctrlKey) {
        event.preventDefault();
        if (!isSaving && hasChanged) handleSave();
      }
    }

    document.addEventListener("keydown", handle);
    return () => document.removeEventListener("keydown", handle);
  }, [handleSave, hasChanged, isSaving]);

  useEffect(() => {
    if (title !== note.title || content !== note.content) {
      setHasChanged(true);
    }
  }, [title, content, note.title, note.content]);

  return (
    <div className="space-y-8">
      <div className="flex h-8 items-center justify-between">
        <p className="text-sm font-medium text-zinc-500">
          Editado em:{" "}
          {note.updatedAt
            ? longDateFormat(note.updatedAt)
            : longDateFormat(note.createdAt)}
        </p>
        {hasChanged && (
          <Button
            onClick={handleSave}
            disabled={isSaving || !hasChanged}
            className="w-20 min-w-fit"
          >
            {isSaving ? "Salvando..." : "Salvar"}
          </Button>
        )}
      </div>
      <div className="space-y-8">
        <h1
          className="block bg-transparent font-serif text-6xl font-bold text-zinc-300 placeholder-zinc-600 outline-none"
          placeholder="Era uma vez..."
          contentEditable
          onInput={(event) =>
            handleUpdateTitle(event.currentTarget.textContent as string)
          }
        >
          {note.title}
        </h1>
        <Editor defaultValue={note.content} onUpdate={handleEditorUpdate} />
      </div>
    </div>
  );
}
