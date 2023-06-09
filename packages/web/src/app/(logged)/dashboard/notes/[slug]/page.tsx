import EditorLayout from "@/components/Layouts/EditorLayout";
import { fetchNote } from "@/lib/notes";
import { cookies } from "next/headers";
import {redirect} from "next/navigation";

interface Props {
  params: {
    slug: string;
  };
}

export default async function Note({ params: { slug } }: Props) {
  const note = await fetchNote(cookies().get("token")?.value as string, slug);

  if(!note) {
    redirect("/dashboard")
  }

  return <EditorLayout note={note} />;
}
