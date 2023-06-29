import { dateToLocaleString } from "@/helpers/date";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import styles from "@/styles/note.module.css";
import clsx from "clsx";

export const revalidate = 120; // 2 minutes

async function fetchPost(id: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/notes/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      return null;
    }

    const note = (await response.json()) as Promise<{
      id: string;
      title: string;
      content: string;
      isPublic: boolean;
      createdAt: string;
      updatedAt: string;
      author: {
        username: string;
        name: string;
      };
    }>;

    return note;
  } catch (error) {
    return null;
  }
}

interface NoteProps {
  params: {
    slug: string;
  };
}

export default async function Note({ params: { slug } }: NoteProps) {
  const note = await fetchPost(slug);

  if (!note) {
    return redirect("/notes");
  }

  return (
    <main className="flex justify-center">
      <article className="w-[768px] max-w-screen-md p-4">
        <div className="mb-2 border-b-2 border-gray-300 pb-2">
          <h1 className="!mb-1">{note.title}</h1>
          <div className="mt-2 flex items-center justify-between gap-2">
            <a
              href="#"
              className="font-medium text-purple-700 transition hover:text-purple-500"
            >
              <span className="font-medium">@</span>
              {note.author.username.toLowerCase()}
            </a>
            <strong className="font-medium text-zinc-600">
              📆 {dateToLocaleString(note.createdAt)}
            </strong>
          </div>
        </div>
        <div
          dangerouslySetInnerHTML={{
            __html: note.content,
          }}
          className={clsx(styles.content, "leading-relaxed")}
        />
      </article>
    </main>
  );
}

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props) {
  const note = await fetchPost(params.slug);
  return {
    title: note?.title + " | Notes",
    description: note?.content,
  };
}
