import { longDateFormat } from "@/helpers/date";
import Link from "next/link";

interface NoteProps {
  title: string;
  createdAt: Date;
  id: string;
}

export default function Note({ title, createdAt, id }: NoteProps) {

  return (
    <Link
      href={`/dashboard/notes/${id}`}
      className="group mt-2 block w-full cursor-pointer rounded-md border border-zinc-500 p-4 shadow shadow-transparent transition-all duration-300 hover:border-zinc-200 hover:shadow-zinc-400"
    >
      <h3 className="line-clamp-2 font-semibold text-zinc-200 transition-colors">
        {title}
      </h3>
      <p className="line-clamp-3 text-sm text-zinc-400">
        {
          longDateFormat(createdAt)
        }
      </p>
    </Link>
  );
}
