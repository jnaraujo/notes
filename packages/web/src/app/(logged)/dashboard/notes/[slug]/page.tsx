import Editor from "@/components/Editor";
import { fetchNote } from "@/lib/notes";
import { cookies } from "next/headers";

interface Props {
  params: {
    slug: string;
  };
}

export default async function Note({ params: { slug } }: Props) {
  const note = await fetchNote(cookies().get("token")?.value as string, slug);

  return (
    <div>
      <form action="" className="space-y-2">
        <input
          type="text"
          className="h-10 bg-transparent text-2xl font-bold text-zinc-300 placeholder-zinc-600 outline-none"
          placeholder="Era uma vez..."
          defaultValue={note.title}
        />
        <Editor defaultValue={note.content} />
      </form>
    </div>
  );
}
