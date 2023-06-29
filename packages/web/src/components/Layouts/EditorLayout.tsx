"use client";

import { Note } from "@/@types/note";
import Editor from "../Editor";
import { useCallback, useEffect, useMemo, useState } from "react";
import { updateNote } from "@/lib/notes";
import Cookies from "js-cookie";
import Button from "../ui/Button";
import { longDateFormat } from "@/helpers/date";
import TextareaAutosize from "react-textarea-autosize";
import { useForm } from "react-hook-form";
import Select from "../ui/Select";

interface Props {
  note: Note;
}

export default function EditorLayout({ note: initialNote }: Props) {
  const { register, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      title: initialNote.title,
      content: initialNote.content,
      isPublic: initialNote.isPublic,
    },
  });
  const title = watch("title");
  const content = watch("content");
  const isPublic = watch("isPublic");

  const [note, setNote] = useState(initialNote);
  const [isSaving, setIsSaving] = useState(false);

  const onSubmit = useCallback(
    (data: any) => {
      setIsSaving(true);

      const { title, content, isPublic } = data;
      updateNote(
        Cookies.get("token") as string,
        note.id,
        title,
        content,
        isPublic
      ).then((note) => {
        setIsSaving(false);
        setNote(note);
      });
    },
    [note.id]
  );

  const hasChanged = useMemo(() => {
    return (
      title !== note.title ||
      content !== note.content ||
      isPublic !== note.isPublic
    );
  }, [title, note, content, isPublic]);

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
      if (hasChanged) {
        event.preventDefault();
        event.returnValue = "";
      }
    }

    window.addEventListener("beforeunload", handleBeforeClosePage);
    document.addEventListener("keydown", handle);

    return () => {
      document.removeEventListener("keydown", handle);
      window.removeEventListener("beforeunload", handleBeforeClosePage);
    };
  }, [handleSubmit, hasChanged, isSaving, onSubmit]);

  const handleEditorUpdate = useCallback(
    (html: string) => {
      setValue("content", html);
    },
    [setValue]
  );

  function handleOnStatusChange(value: string) {
    setValue("isPublic", value === "Público");
  }

  return (
    <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex h-8 items-center justify-between">
        <p className="text-sm font-medium text-zinc-500">
          Editado em:{" "}
          {note.updatedAt
            ? longDateFormat(note.updatedAt)
            : longDateFormat(note.createdAt)}
        </p>
        <div className="flex gap-2">
          <Select
            items={["Privado", "Público"]}
            defaultValue={isPublic ? "Público" : "Privado"}
            onChange={handleOnStatusChange}
          />
          <Button
            type="submit"
            disabled={isSaving || !hasChanged}
            className="min-w-fit px-4"
          >
            {isSaving ? "Salvando..." : "Salvar"}
          </Button>
        </div>
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
