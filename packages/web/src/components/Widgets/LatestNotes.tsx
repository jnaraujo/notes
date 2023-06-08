"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import Note from "../Note";
import { fetchNotes } from "@/lib/notes";
import Cookies from "js-cookie";
import Button from "../ui/Button";
import clsx from "clsx";

export default function LatestNotes() {
  const { data, isLoading } = useQuery({
    queryKey: ["latest-notes"],
    queryFn: () => fetchNotes(Cookies.get("token") as string, 5),
  });

  const shouldShowEmptyState = data?.length === 0 && !isLoading;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium text-zinc-100">
          Suas últimas notas:
        </h2>
        <Button className="w-36" asChild>
          <Link href="/dashboard/notes/new">Criar nota</Link>
        </Button>
      </div>

      <div
        className={clsx("mt-2 flex min-h-[600px] flex-col items-center gap-2", {
          "justify-center": shouldShowEmptyState || isLoading,
        })}
      >
        {shouldShowEmptyState && (
          <div className="flex flex-col items-center justify-center gap-2">
            <p className="text-zinc-300">Você não tem nenhuma nota ainda.</p>
            <Button className="w-36" asChild>
              <Link href="/dashboard/notes/new">Criar nova nota</Link>
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
            isPublic={note.isPublic}
            title={note.title}
            description={note.description}
            id={note.id}
          />
        ))}
      </div>
    </div>
  );
}
