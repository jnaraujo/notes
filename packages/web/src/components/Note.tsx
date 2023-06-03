import { views as format } from "@/helpers/format";
import { BarChart } from "lucide-react";

interface NoteProps {
  title: string;
  description: string;
  views: number;
  url: string;
}

export default function Note({
  title, description, views, url
}: NoteProps) {
  return (
    <a href={url} className="bg-zinc-200/50 group hover:bg-zinc-200 rounded-md p-4 mt-2 shadow hover:shadow-md transition-all cursor-pointer">
      <div className="flex justify-between items-center gap-2">
        <h3 className="text-lg font-bold text-zinc-600 line-clamp-2 group-hover:text-purple-500 transition-colors">{title}</h3>
        <div className="flex justify-center items-center shrink-0">
          <BarChart size={18} />
          <span className="text-sm" title={`${format(views)} views`}>
            {format(views)}
          </span>
        </div>
      </div>
      <p className="text-zinc-500 text-base line-clamp-3">
        {description}
      </p>
    </a>
  )
}