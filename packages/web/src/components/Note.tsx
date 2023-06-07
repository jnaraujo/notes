import Link from "next/link";

interface NoteProps {
  title: string;
  description: string;
  isPublic: boolean;
  id: string;
}

export default function Note({ title, description, isPublic, id }: NoteProps) {
  const url = isPublic ? `/notes/${id}` : `/notes/private/${id}`;

  return (
    <Link
      href={url}
      className="group mt-2 cursor-pointer rounded-md border border-zinc-500 p-4 shadow shadow-transparent transition-all duration-300 hover:border-zinc-200 hover:shadow-zinc-400"
    >
      <h3 className="line-clamp-2 font-semibold text-zinc-200 transition-colors">
        {title}
      </h3>
      <p className="line-clamp-3 text-sm text-zinc-300">{description}</p>
    </Link>
  );
}
