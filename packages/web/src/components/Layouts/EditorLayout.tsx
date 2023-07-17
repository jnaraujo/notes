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
import { Forward, Send } from "lucide-react";
import Tooltip from "../ui/Tooltip";
import { toast } from "react-hot-toast";

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

  function handleShare() {
    if (!note.isPublic) {
      toast.error("Você não pode compartilhar uma nota privada");
      return;
    }

    if (!navigator || !navigator.clipboard) {
      toast.error(
        "Seu navegador não suporta a funcionalidade de copiar para a área de transferência"
      );
      return;
    }

    toast.success("O link da nota foi copiado para a área de transferência");
    navigator.clipboard.writeText(`${window.location.origin}/notes/${note.id}`);
  }

  return (
    <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex h-8 items-center justify-between">
        <div className="flex flex-col">
          <p className="text-sm font-medium text-zinc-500">
            Editado em:{" "}
            {note.updatedAt
              ? longDateFormat(note.updatedAt)
              : longDateFormat(note.createdAt)}
          </p>
        </div>
        <div className="flex gap-4">
          <Tooltip text="Compartilhar">
            <button
              type="button"
              className="ml-8 flex h-10 items-center justify-center text-zinc-300 hover:text-zinc-200"
              onClick={handleShare}
            >
              <Send size={20} />
            </button>
          </Tooltip>

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
      <div className="space-y-2">
        <TextareaAutosize
          autoFocus
          defaultValue={note.title}
          spellCheck={false}
          className="block w-full resize-none bg-transparent font-serif text-5xl font-bold text-zinc-300 placeholder-zinc-600 outline-none"
          placeholder="Era uma vez..."
          {...register("title")}
        />
        <Editor defaultValue={note.content} onUpdate={handleEditorUpdate} />
      </div>
    </form>
  );
}
