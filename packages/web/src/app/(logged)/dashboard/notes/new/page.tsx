import { createNote } from "@/lib/notes";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function New() {
  const note = await createNote(
    cookies().get("token")?.value as string,
    "Nota sem título",
    ""
  );

  if (!note) {
    redirect("/dashboard");
  }

  redirect(`/dashboard/notes/${note.id}`);
}
