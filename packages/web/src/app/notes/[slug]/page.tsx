import { dateToLocaleString } from "@/helpers/date";
import { Metadata } from "next";
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: "Note",
  description: "Note",
}

async function fetchPost(id: string) {
  try {
    const response = await fetch(`${process.env.NOTES_API}/notes/${id}`, {
      next: {
        revalidate: 60, // seconds
      }
    });

    return response.json() as Promise<{
      id: string;
      title: string;
      content: string;
      isPublic: boolean;
      createdAt: string;
      updatedAt: string;
      author: {
        username: string;
        name: string;
      }
    }>;
  } catch (error) {
    return null;
  }
}

interface NoteProps {
  params: {
    slug: string;
  }
}

export default async function Note({
  params: { slug },
}: NoteProps) {
  const note = await fetchPost(slug);


  if (!note) {
    return redirect("/notes");
  }


  return (
    <main className="flex h-screen justify-center">
      <article className="p-4 md:w-[600px] xl:w-[700px]">
        <div className="border-b-2 border-gray-300 pb-2 mb-2">
          <h1 className="font-black text-3xl text-zinc-600 leading-tight">
            {note.title}
          </h1>
          <div className="flex items-center gap-2 justify-between mt-2">
            <a href="#" className="font-medium text-purple-700 transition hover:text-purple-500">
              <span className="font-medium">@</span>{note.author.username.toLowerCase()}
            </a>
            <strong className="font-medium text-zinc-600">
              📆 {dateToLocaleString(note.createdAt)}
            </strong>
          </div>
        </div>
        {
          note.content.split(/\\n/g).map((paragraph: string, index: number) => (
            <p key={index} className="mt-4 text-zinc-500">
              {paragraph}
            </p>
          ))
        }
      </article>
    </main>
  )
}