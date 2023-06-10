"use client";

import { Note } from "@/@types/note";
import Editor from "../Editor";
import { useCallback, useEffect, useState } from "react";
import { updateNote } from "@/lib/notes";
import Cookies from "js-cookie";
import Button from "../ui/Button";
import { longDateFormat } from "@/helpers/date";
import TextareaAutosize from "react-textarea-autosize";
import { useForm } from "react-hook-form";

interface Props {
  note: Note;
}

export default function EditorLayout({ note: initialNote }: Props) {
  const { register, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      title: initialNote.title,
      content: initialNote.content,
    },
  });
  const title = watch("title");
  const content = watch("content");

  const [note, setNote] = useState(initialNote);
  const [hasChanged, setHasChanged] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const onSubmit = useCallback(
    (data: any) => {
      setIsSaving(true);
      const { title, content } = data;
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
    },
    [note.id]
  );

  useEffect(() => {
    function handle(event: KeyboardEvent) {
      if (event.code === "KeyS" && event.ctrlKey) {
        event.preventDefault();
        if (!isSaving && hasChanged) {
          handleSubmit(onSubmit)();
        }
      }
    }

    function handleBeforeClosePage(event: BeforeUnloadEvent) {
      if(hasChanged) {
        event.preventDefault();
        event.returnValue = "";
      }
    }

    window.addEventListener("beforeunload", handleBeforeClosePage)
    document.addEventListener("keydown", handle);

    return () => {
      document.removeEventListener("keydown", handle);
      window.removeEventListener("beforeunload", handleBeforeClosePage)
    }
  }, [handleSubmit, hasChanged, isSaving, onSubmit]);

  useEffect(() => {
    const hasChanged = title !== note.title || content !== note.content;

    setHasChanged(hasChanged);
  }, [content, note.content, note.title, title]);

  const handleEditorUpdate = useCallback(
    (html: string) => {
      setValue("content", html);
    },
    [setValue]
  );

  return (
    <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex h-8 items-center justify-between">
        <p className="text-sm font-medium text-zinc-500">
          Editado em:{" "}
          {note.updatedAt
            ? longDateFormat(note.updatedAt)
            : longDateFormat(note.createdAt)}
        </p>
        {hasChanged && (
          <Button
            type="submit"
            disabled={isSaving || !hasChanged}
            className="min-w-fit px-4"
          >
            {isSaving ? "Salvando..." : "Salvar"}
          </Button>
        )}
      </div>
      <div className="space-y-8">
        <TextareaAutosize
          autoFocus
          defaultValue={note.title}
          className="block w-full resize-none bg-transparent font-serif text-6xl font-bold text-zinc-300 placeholder-zinc-600 outline-none"
          placeholder="Era uma vez..."
          {...register("title")}
        />
        <Editor defaultValue={note.content} onUpdate={handleEditorUpdate} />
      </div>
    </form>
  );
}
