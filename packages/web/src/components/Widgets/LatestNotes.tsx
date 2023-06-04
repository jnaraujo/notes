"use client";

import { useQuery } from "@tanstack/react-query";
import Note from "../Note";
import { fetchNotes } from "@/lib/notes";
import Cookies from "js-cookie";

export default function LatestNotes() {
  const { data, isLoading } = useQuery({
    queryKey: ["latest-notes"],
    queryFn: () => fetchNotes({
      token: Cookies.get("token") as string,
      limit: 5,
    }),
  });

  if(!data || isLoading) return <p>Carregando...</p>;
  
  return (
    <div className="w-full">
      <h2 className="text-xl font-bold text-zinc-500 md:text-2xl">
        Suas últimas notas:
      </h2>
      <div className="mt-2 flex flex-col gap-2">
        {
          data.map((note, index) => (
            <Note
              key={index}
              title={note.title}
              description={note.description}
              views={note.views}
              url={note.url}
            />
          ))
        }
      </div>
    </div>
  );
}
