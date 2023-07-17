import { dateToLocaleString } from "@/helpers/date";
import { redirect } from "next/navigation";
import styles from "@/styles/note.module.css";
import clsx from "clsx";
import { mensureReadingTimeInMin } from "@/helpers/readingTime";

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
      <article className="my-6 w-[768px] max-w-screen-md space-y-6 p-4">
        <h1 className="font-serif text-5xl font-bold text-zinc-300 ">
          {note.title}
        </h1>
        <div className="space-x-2 font-medium text-zinc-400 md:space-x-6">
          <a href="#" className="hover:text-purple-500">
            @{note.author.username.toLowerCase()}
          </a>
          <span>•</span>
          <span>☕ {mensureReadingTimeInMin(note.content)} min(s)</span>
          <span>•</span>
          <span>{dateToLocaleString(note.createdAt)}</span>
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
