"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import Note from "../Note";
import { createNote, fetchNotes } from "@/lib/notes";
import Cookies from "js-cookie";
import Button from "../ui/Button";
import clsx from "clsx";
import { useRouter } from "next/navigation";

export default function Notes() {
  const { data, isLoading } = useQuery({
    queryKey: ["latest-notes"],
    queryFn: () => fetchNotes(Cookies.get("token") as string),
    refetchOnMount: "always",
  });
  const Router = useRouter();

  const shouldShowEmptyState = data?.length === 0 && !isLoading;

  function handleCreateNote() {
    createNote(Cookies.get("token") as string, "Nota sem título", "").then(
      (res) => {
        Router.push(`/dashboard/notes/${res.id}`);
      }
    );
  }

  return (
    <>
      <div className="w-full space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium text-zinc-100">
            Suas últimas notas:
          </h2>
          <Button className="w-36" onClick={handleCreateNote}>
            Criar nota
          </Button>
        </div>

        <div
          className={clsx(
            "mt-2 flex min-h-[600px] flex-col items-center gap-4",
            {
              "justify-center": shouldShowEmptyState || isLoading,
            }
          )}
        >
          {shouldShowEmptyState && (
            <div className="flex flex-col items-center justify-center gap-2">
              <p className="text-zinc-300">Você não tem nenhuma nota ainda.</p>
              <Button className="w-36" onClick={handleCreateNote}>
                Criar nova nota
              </Button>
            </div>
          )}
          {isLoading && (
            <div className="flex flex-col items-center justify-center gap-2">
              <p className="text-zinc-300">Carregando...</p>
            </div>
          )}
          {data?.map((note, index) => (
            <Note
              key={index}
              title={note.title}
              createdAt={note.createdAt}
              id={note.id}
            />
          ))}
        </div>
      </div>
    </>
  );
}
