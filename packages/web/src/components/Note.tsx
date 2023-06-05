import { views as format } from "@/helpers/format";
import Link from "next/link";
import { BarChart, EyeOff } from "lucide-react";

interface NoteProps {
  title: string;
  description: string;
  views: number;
  isPublic: boolean;
  id: string;
}

export default function Note({
  title,
  description,
  views,
  isPublic,
  id,
}: NoteProps) {
  const url = isPublic ? `/notes/${id}` : `/notes/private/${id}`;

  return (
    <Link
      href={url}
      className="group mt-2 cursor-pointer rounded-md bg-zinc-200/50 p-4 shadow transition-all hover:bg-zinc-200 hover:shadow-md"
    >
      <div className="flex items-center justify-between gap-2">
        <h3 className="line-clamp-2 text-lg font-bold text-zinc-600 transition-colors group-hover:text-purple-500">
          {title}
        </h3>
        <div className="flex gap-2">
          <div className="flex shrink-0 items-center justify-center">
            <BarChart size={18} />
            <span className="text-sm" title={`${format(views)} views`}>
              {format(views)}
            </span>
          </div>
          <div>
            { !isPublic && <EyeOff size={18} /> }
          </div>
        </div>
      </div>
      <p className="line-clamp-3 text-base text-zinc-500">{description}</p>
    </Link>
  );
}
